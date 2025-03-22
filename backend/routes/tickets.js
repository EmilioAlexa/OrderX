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

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Obtener todos los tickets
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets obtenida correctamente
 */

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Agregar un nuevo ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subtotal:
 *                 type: number
 *               taxes:
 *                 type: number
 *               total:
 *                 type: number
 *               payment_method_fk:
 *                 type: integer
 *               is_duplicate_ticket:
 *                 type: boolean
 *               baksheesh:
 *                 type: number
 *               id_order_fk:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Ticket agregado correctamente
 */

/**
 * @swagger
 * /tickets/{id_order}:
 *   get:
 *     summary: Obtener un ticket por ID de orden
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_order
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket encontrado
 *       404:
 *         description: Ticket no encontrado
 */

// Ruta
app.route("/tickets/:id_order").get(verifyToken, getTicketByOrderId);

app.route("/tickets").get(verifyToken, getTickets);
app.route("/tickets").post(verifyToken, postTickets);

module.exports = app;
