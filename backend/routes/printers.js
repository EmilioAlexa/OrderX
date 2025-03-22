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

/**
 * @swagger
 * /printers:
 *   get:
 *     summary: Obtiene la lista de impresoras
 *     tags: [Printers]
 *     responses:
 *       200:
 *         description: Lista de impresoras obtenida correctamente
 */

/**
 * @swagger
 * /printers:
 *   post:
 *     summary: Agrega una nueva impresora
 *     tags: [Printers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_connected:
 *                 type: boolean
 *               status:
 *                 type: string
 *               id_restaurant_fk:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Impresora añadida correctamente
 */

// Rutas
app.route("/printers").get(verifyToken, getPrinters);
app.route("/printers").post(verifyToken, postPrinters);

module.exports = app;
