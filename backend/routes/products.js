const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connection } = require("../config/config.db");
const verifyToken = require("../middleware/auth"); // Importamos el middleware

dotenv.config();

const getProducts = (request, response) => {
    connection.query("SELECT * FROM products",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const postProducts = (request, response) => {
    const { name, description, price, category, is_available, id_restaurant_fk } = request.body;
    connection.query("INSERT INTO products (name, description, price, category, is_available, id_restaurant_fk) VALUES (?, ?, ?, ?, ?, ?)",
        [name, description, price, category, is_available, id_restaurant_fk],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            console.log("Datos recibidos:", request.body);
        });
};

const getProductsByCategory = (request, response) => {
    const { category } = request.params;
    connection.query("SELECT * FROM products WHERE category = ?", [category], 
    (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               is_available:
 *                 type: boolean
 *               id_restaurant_fk:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto agregado correctamente
 */

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Obtener productos por categoría
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Productos filtrados por categoría
 */

// Protegemos las rutas con `verifyToken`
app.route("/products/category/:category").get(verifyToken, getProductsByCategory);
app.route("/products").get(verifyToken, getProducts);
app.route("/products").post(verifyToken, postProducts);

module.exports = app;
