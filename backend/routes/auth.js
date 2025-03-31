const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { connection } = require("../config/config.db");

dotenv.config();

const router = express.Router();

// Endpoint para iniciar sesión y generar token
const login = (request, response) => {
    console.log("Datos recibidos:", request.body); // Para depuración

    const { email, password } = request.body;

    connection.query("SELECT * FROM users WHERE email = ?", [email], async (error, results) => {
        if (error) {
            console.error("Error en la consulta SQL:", error);
            return response.status(500).json({ message: "Error en el servidor" });
        }

        if (results.length === 0) {
            return response.status(401).json({ message: "Credenciales incorrectas" });
        }

        const user = results[0];

        // Comparar contraseña con `bcrypt`
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Generar el token
        const token = jwt.sign(
            { id: user.id_user, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        response.status(200).json({ message: "Login exitoso", token });
    });
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión y obtener un token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", login);

module.exports = router;
