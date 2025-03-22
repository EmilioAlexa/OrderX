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

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida correctamente
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Agregar un nuevo cliente
 *     tags: [Clientes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               session_id:
 *                 type: string
 *               last_activity:
 *                 type: string
 *               id_restaurant_fk:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cliente agregado correctamente
 */

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 */

// Ruta
app.route("/customers/:id").get(verifyToken, getCustomerById);

app.route("/customers").get(verifyToken, getCustomers);
app.route("/customers").post(verifyToken, postCustomers);

module.exports = app;
