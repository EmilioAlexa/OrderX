const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const verifyToken = require("../middleware/auth");
const dotenv = require("dotenv");
dotenv.config();
const { connection } = require("../config/config.db");

app.use(express.json());

// Obtener la información de un usuario por ID
const getUserById = (req, res) => {
    const { id } = req.params;
    connection.query(
        "SELECT id_user, username, email, address FROM users WHERE id_user = ?", 
        [id], 
        (error, results) => {
            if (error) throw error;
            if (results.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
            res.status(200).json(results[0]);
        }
    );
};

// Actualizar la información de un usuario (incluye cambio de contraseña opcional)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, address, password } = req.body;

    try {
        let query = "UPDATE users SET username = ?, email = ?, address = ? WHERE id_user = ?";
        let values = [username, email, address, id];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query = "UPDATE users SET username = ?, email = ?, address = ?, password = ? WHERE id_user = ?";
            values = [username, email, address, hashedPassword, id];
        }

        connection.query(query, values, (error, results) => {
            if (error) throw error;
            if (results.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
            res.status(200).json({ message: "Usuario actualizado correctamente" });
        });

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
};

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtener información de un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del usuario obtenida correctamente
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Actualizar la información de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 */

app.route("/user/:id").get(verifyToken, getUserById).put(verifyToken, updateUser);

module.exports = app;
