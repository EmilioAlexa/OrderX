const express = require("express");
const app = express();
const verifyToken = require("../middleware/auth"); // Importamos el middleware
const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config/config.db");

const getEmployees = (request, response) => {
    connection.query("SELECT * FROM employees",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const postEmployees = (request, response) => {
    const { name, role, id_restaurant_fk } = request.body;
    connection.query("INSERT INTO employees (name, role, id_restaurant_fk) VALUES (?, ?, ?)",
        [name, role, id_restaurant_fk],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            console.log("Datos recibidos:", request.body);
        });
};

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida correctamente
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Agregar un nuevo empleado
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               id_restaurant_fk:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Empleado agregado correctamente
 */

//rutas
app.route("/employees").post(verifyToken, postEmployees);
app.route("/employees").get(verifyToken, getEmployees);

module.exports = app;