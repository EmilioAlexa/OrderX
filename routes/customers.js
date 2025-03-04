const express = require("express"); 
const app = express();
const verifyToken = require("../middleware/auth"); // Importamos el middleware
const dotenv = require("dotenv");
dotenv.config();

// Conexión con la base de datos
const { connection } = require("../config/config.db");

// Obtener todos los clientes
const getCustomers = (request, response) => {
    connection.query("SELECT * FROM customers", 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Agregar un nuevo cliente
const postCustomers = (request, response) => {
    const { session_id, last_activity, id_restaurant_fk } = request.body;
    connection.query("INSERT INTO customers (session_id, last_activity, id_restaurant_fk) VALUES (?, ?, ?)",
        [session_id, last_activity, id_restaurant_fk],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            console.log("Datos recibidos:", request.body);
        });
};

// Obtener los datos de un cliente específico
const getCustomerById = (request, response) => {
    const { id } = request.params;
    connection.query("SELECT * FROM customers WHERE id_customer = ?", [id], 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Ruta
app.route("/customers/:id").get(verifyToken, getCustomerById);

app.route("/customers").get(verifyToken, getCustomers);
app.route("/customers").post(verifyToken, postCustomers);

module.exports = app;
