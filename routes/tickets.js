const express = require("express"); 
const app = express();
const verifyToken = require("../middleware/auth"); // Importamos el middleware
const dotenv = require("dotenv");
dotenv.config();

// Conexión con la base de datos
const { connection } = require("../config/config.db");

// Obtener todos los tickets
const getTickets = (request, response) => {
    connection.query("SELECT * FROM tickets", 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Agregar un nuevo ticket
const postTickets = (request, response) => {
    const { subtotal, taxes, total, payment_method_fk, is_duplicate_ticket, baksheesh, id_order_fk } = request.body;
    connection.query("INSERT INTO tickets (subtotal, taxes, total, payment_method_fk, is_duplicate_ticket, baksheesh, id_order_fk) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [subtotal, taxes, total, payment_method_fk, is_duplicate_ticket, baksheesh, id_order_fk],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            console.log("Datos recibidos:", request.body);
        });
};

// Obtener el ticket de un pedido específico
const getTicketByOrderId = (request, response) => {
    const { id_order } = request.params;
    connection.query("SELECT * FROM tickets WHERE id_order_fk = ?", [id_order], 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Ruta
app.route("/tickets/:id_order").get(verifyToken, getTicketByOrderId);

app.route("/tickets").get(verifyToken, getTickets);
app.route("/tickets").post(verifyToken, postTickets);

module.exports = app;
