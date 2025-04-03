const express = require("express");
const app = express();
const verifyToken = require("../middleware/auth"); // Middleware de autenticación
const dotenv = require("dotenv");
dotenv.config();

// Conexión con la base de datos
const { connection } = require("../config/config.db");

// GET: Obtener un usuario por ID
const getUserById = (req, res) => {
    const userId = req.params.id;
    connection.query("SELECT * FROM users WHERE id_user = ?", [userId], (error, results) => {
        if (error) throw error;
        if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
        res.status(200).json(results[0]);
    });
};

// POST: Agregar un nuevo usuario
const postUser = (req, res) => {
    const { username, name, email, password, address, img_url } = req.body;
    connection.query(
        "INSERT INTO users (username, name, email, password, address, img_url) VALUES (?, ?, ?, ?, ?, ?)",
        [username, name, email, password, address, img_url || null],
        (error, results) => {
            if (error) throw error;
            res.status(201).json({ message: "Usuario añadido correctamente", userId: results.insertId });
        }
    );
};

// PUT: Actualizar un usuario por ID
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { username, name, email, password, address, img_url } = req.body;
    
    connection.query(
        "UPDATE users SET username=?, name=?, email=?, password=?, address=?, img_url=? WHERE id_user=?",
        [username, name, email, password, address, img_url || null, userId],
        (error, results) => {
            if (error) throw error;
            if (results.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
            res.status(200).json({ message: "Usuario actualizado correctamente" });
        }
    );
};

// DELETE: Eliminar un usuario por ID
const deleteUser = (req, res) => {
    const userId = req.params.id;
    connection.query("DELETE FROM users WHERE id_user = ?", [userId], (error, results) => {
        if (error) throw error;
        if (results.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    });
};

// Definir rutas
app.route("/users/:id").get(verifyToken, getUserById);
app.route("/users").post(verifyToken, postUser);
app.route("/users/:id").put(verifyToken, updateUser);
app.route("/users/:id").delete(verifyToken, deleteUser);

module.exports = app;
