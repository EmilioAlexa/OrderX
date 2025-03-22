const express = require("express"); 
const app = express();
const verifyToken = require("../middleware/auth"); // Importamos el middleware
const dotenv = require("dotenv");
dotenv.config();

// Conexión con la base de datos
const { connection } = require("../config/config.db");

// Obtener todas las órdenes
const getOrders = (request, response) => {
    connection.query("SELECT * FROM orders", 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Agregar una nueva orden
const postOrders = (request, response) => {
    const { table_number, order_details, status, order_date, id_customer_fk } = request.body;
    connection.query("INSERT INTO orders (table_number, order_details, status, order_date, id_customer_fk) VALUES (?, ?, ?, ?, ?)",
        [table_number, order_details, status, order_date, id_customer_fk],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            console.log("Datos recibidos:", request.body);
        });
};

// Obtener detalles de un pedido específico
const getOrderById = (request, response) => {
    const { id } = request.params;
    connection.query("SELECT * FROM orders WHERE id_order = ?", [id], 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Actualizar el estado de un pedido
const updateOrderStatus = (request, response) => {
    const { id } = request.params;
    const { status } = request.body;
    connection.query("UPDATE orders SET status = ? WHERE id_order = ?", [status, id], 
    (error, results) => {
        if (error) throw error;
        response.status(200).json({ "Estado actualizado": results.affectedRows });
    });
};

// Consultar los pedidos de un cliente específico
const getOrdersByCustomer = (request, response) => {
    const { id_customer } = request.params;
    connection.query("SELECT * FROM orders WHERE id_customer_fk = ?", [id_customer], 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// Listar todos los pedidos de un restaurante
const getOrdersByRestaurant = (request, response) => {
    const { id_restaurant } = request.params;
    connection.query(`SELECT orders.* FROM orders 
        JOIN customers ON orders.id_customer_fk = customers.id_customer 
        WHERE customers.id_restaurant_fk = ?`, [id_restaurant], 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crea una nueva orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table_number:
 *                 type: integer
 *               order_details:
 *                 type: string
 *               status:
 *                 type: string
 *               order_date:
 *                 type: string
 *                 format: date
 *               id_customer_fk:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtiene la lista de órdenes
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de órdenes obtenida correctamente
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtiene los detalles de una orden específica
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la orden obtenidos correctamente
 */

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Actualiza el estado de una orden
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado de la orden actualizado correctamente
 */

/**
 * @swagger
 * /orders/customer/{id_customer}:
 *   get:
 *     summary: Obtiene todas las órdenes de un cliente específico
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id_customer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Órdenes del cliente obtenidas correctamente
 */

/**
 * @swagger
 * /orders/restaurant/{id_restaurant}:
 *   get:
 *     summary: Obtiene todas las órdenes de un restaurante específico
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id_restaurant
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Órdenes del restaurante obtenidas correctamente
 */

// Rutas
app.route("/orders/:id").get(verifyToken, getOrderById);
app.route("/orders/:id/status").patch(verifyToken, updateOrderStatus);
app.route("/orders/customer/:id_customer").get(verifyToken, getOrdersByCustomer);
app.route("/orders/restaurant/:id_restaurant").get(verifyToken, getOrdersByRestaurant);

app.route("/orders").get(getOrders);
app.route("/orders").post(postOrders);

module.exports = app;
