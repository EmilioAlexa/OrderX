const express = require("express");
const app = express();
const verifyToken = require("../middleware/auth"); // Importamos el middleware
const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config/config.db");

const getPayment = (request, response) => {
    connection.query("SELECT * FROM payment_methods",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const postPaymentMethods = (request, response) => {
    const { method } = request.body;
    connection.query("INSERT INTO payment_methods (method) VALUES (?)",
        [method],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            console.log("Datos recibidos:", request.body);
        });
};


/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Obtiene todos los métodos de pago
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Métodos de pago obtenidos correctamente
 */

/**
 * @swagger
 * /payment_methods:
 *   post:
 *     summary: Agrega un nuevo método de pago
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               method:
 *                 type: string
 *     responses:
 *       201:
 *         description: Método de pago añadido correctamente
 */

//rutas
app.route("/payment").get(verifyToken, getPayment);
app.route("/payment_methods").post(verifyToken, postPaymentMethods);

module.exports = app;