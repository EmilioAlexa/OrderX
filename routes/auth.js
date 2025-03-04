const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { connection } = require("../config/config.db");

dotenv.config();

const app = express();

// Endpoint para iniciar sesión y generar token
const login = (request, response) => {
    const { email, password } = request.body;

    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], 
    (error, results) => {
        if (error) throw error;
        
        if (results.length > 0) {
            // Usuario autenticado, generamos token
            const token = jwt.sign(
                { id: results[0].id_user, email: results[0].email, role: results[0].role }, 
                process.env.JWT_SECRET, 
                { expiresIn: "2h" } // Token válido por 2 horas
            );

            response.status(200).json({ message: "Login exitoso", token });
        } else {
            response.status(401).json({ message: "Credenciales incorrectas" });
        }
    });
};

// Ruta de login
app.route("/login").post(login);

module.exports = app;
