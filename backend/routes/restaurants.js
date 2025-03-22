const express = require("express");
const app = express();
const verifyToken = require("../middleware/auth"); // Importamos el middleware

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config/config.db");

const getRestaurants = (request, response) => {
    connection.query("SELECT * FROM restaurants",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const postRestaurants = (request, response) => {
    const {name,brand_manual,RFC,infrastructure,information} = request.body;
    connection.query("INSERT INTO restaurants (name,brand_manual,RFC,infrastructure,information) VALUES (?,?,?,?,?) ",
    [name,brand_manual,RFC,infrastructure,information],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente":
        results.affectedRows});
        console.log("Datos recibidos:", request.body); // <-- Esto imprimirá los datos en la terminal
    });
};

const getRestaurantById = (request, response) => {
    const { id } = request.params;
    connection.query("SELECT * FROM restaurants WHERE id_restaurant = ?", [id],
    (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).json(results[0]); // Devuelve solo el objeto si existe
        } else {
            response.status(404).json({ message: "Restaurante no encontrado" });
        }
    });
};

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Obtener todos los restaurantes
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de restaurantes obtenida correctamente
 */

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Agregar un nuevo restaurante
 *     tags: [Restaurants]
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
 *               brand_manual:
 *                 type: string
 *               RFC:
 *                 type: string
 *               infrastructure:
 *                 type: string
 *               information:
 *                 type: string
 *     responses:
 *       201:
 *         description: Restaurante agregado correctamente
 */

/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Obtener un restaurante por ID
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Restaurante encontrado
 *       404:
 *         description: Restaurante no encontrado
 */

//rutas
app.route("/restaurants/:id").get(verifyToken, getRestaurantById);
app.route("/restaurants").post(verifyToken, postRestaurants);
app.route("/restaurants").get(verifyToken, getRestaurants);

module.exports = app;