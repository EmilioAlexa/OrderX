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

//rutas
app.route("/payment").get(verifyToken, getPayment);
app.route("/payment_methods").post(verifyToken, postPaymentMethods);

module.exports = app;