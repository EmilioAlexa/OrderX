const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { connection } = require("../config/config.db");


dotenv.config();

const app = express();

// Endpoint para iniciar sesión y generar token
const login = (request, response) => {
    console.log("Datos recibidos:", request.body); // <--- Agregado para depuración

    const { email, password } = request.body;

    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], 
    (error, results) => {
        if (error) {
            console.error("Error en la consulta SQL:", error);
            return response.status(500).json({ message: "Error en el servidor" });
        }
        
        if (results.length > 0) {
            const token = jwt.sign(
                { id: results[0].id_user, email: results[0].email, role: results[0].role }, 
                process.env.JWT_SECRET, 
                { expiresIn: "1h" }
            );

            response.status(200).json({ message: "Login exitoso", token });
        } else {
            response.status(401).json({ message: "Credenciales incorrectas" });
        }
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
// Ruta de login
app.route("/login").post(login);

module.exports = app;
