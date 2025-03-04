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

// Rutas
app.route("/orders/:id").get(verifyToken, getOrderById);
app.route("/orders/:id/status").patch(verifyToken, updateOrderStatus);
app.route("/orders/customer/:id_customer").get(verifyToken, getOrdersByCustomer);
app.route("/orders/restaurant/:id_restaurant").get(verifyToken, getOrdersByRestaurant);

app.route("/orders").get(getOrders);
app.route("/orders").post(postOrders);

module.exports = app;
