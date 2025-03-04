const express = require("express"); 
const app = express();
const verifyToken = require("../middleware/auth"); // Importamos el middleware
const dotenv = require("dotenv");
dotenv.config();

// Conexión con la base de datos
const { connection } = require("../config/config.db");

// Obtener todas las impresoras
const getPrinters = (request, response) => {
    connection.query("SELECT * FROM printers", 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Agregar una nueva impresora
const postPrinters = (request, response) => {
    const { is_connected, status, id_restaurant_fk } = request.body;
    connection.query("INSERT INTO printers (is_connected, status, id_restaurant_fk) VALUES (?, ?, ?)",
        [is_connected, status, id_restaurant_fk],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            console.log("Datos recibidos:", request.body);
        });
};

// Rutas
app.route("/printers").get(verifyToken, getPrinters);
app.route("/printers").post(verifyToken, postPrinters);

module.exports = app;
