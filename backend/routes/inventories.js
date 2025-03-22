const express = require("express");
const app = express();
const verifyToken = require("../middleware/auth"); // Importamos el middleware
const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config/config.db");

const getInventories = (request, response) => {
    connection.query("SELECT * FROM inventories",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const postInventories = (request, response) => {
    const { ingredient_name, category, expiration_date, is_available, reason_for_shrinkage, id_restaurant_fk } = request.body;
    connection.query("INSERT INTO inventories (ingredient_name, category, expiration_date, is_available, reason_for_shrinkage, id_restaurant_fk) VALUES (?, ?, ?, ?, ?, ?)",
        [ingredient_name, category, expiration_date, is_available, reason_for_shrinkage, id_restaurant_fk],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            console.log("Datos recibidos:", request.body);
        });
};

/**
 * @swagger
 * /inventories:
 *   get:
 *     summary: Obtener todos los inventarios
 *     tags: [Inventarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de inventarios obtenida correctamente
 */

/**
 * @swagger
 * /inventories:
 *   post:
 *     summary: Agregar un nuevo inventario
 *     tags: [Inventarios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredient_name:
 *                 type: string
 *               category:
 *                 type: string
 *               expiration_date:
 *                 type: string
 *                 format: date
 *               is_available:
 *                 type: boolean
 *               reason_for_shrinkage:
 *                 type: string
 *               id_restaurant_fk:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Inventario agregado correctamente
 */

//rutas
app.route("/inventories").post(verifyToken, postInventories);
app.route("/inventories").get(verifyToken, getInventories);

module.exports = app;