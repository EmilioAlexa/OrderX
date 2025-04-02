const express = require("express");
const app = express();
const verifyToken = require("../middleware/auth");
const dotenv = require("dotenv");
dotenv.config();
const { connection } = require("../config/config.db");

app.use(express.json());

// Obtener todos los empleados
const getEmployees = (req, res) => {
    connection.query("SELECT * FROM employees", (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

// Obtener un empleado por ID
const getEmployeeById = (req, res) => {
    const { id } = req.params;
    connection.query("SELECT * FROM employees WHERE id_employee = ?", [id], (error, results) => {
        if (error) throw error;
        if (results.length === 0) return res.status(404).json({ message: "Empleado no encontrado" });
        res.status(200).json(results[0]);
    });
};

// Crear un nuevo empleado
const postEmployee = (req, res) => {
    const { name, id_restaurant_fk, role_id, email, phone, age, salary, estatus } = req.body;
    connection.query(
        "INSERT INTO employees (name, id_restaurant_fk, role_id, email, phone, age, salary, estatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [name, id_restaurant_fk, role_id, email, phone, age, salary, estatus],
        (error, results) => {
            if (error) throw error;
            res.status(201).json({ message: "Empleado añadido correctamente", id: results.insertId });
        }
    );
};

// Actualizar un empleado
const updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, id_restaurant_fk, role_id, email, phone, age, salary, estatus } = req.body;
    connection.query(
        "UPDATE employees SET name = ?, id_restaurant_fk = ?, role_id = ?, email = ?, phone = ?, age = ?, salary = ?, estatus = ? WHERE id_employee = ?",
        [name, id_restaurant_fk, role_id, email, phone, age, salary, estatus, id],
        (error, results) => {
            if (error) throw error;
            if (results.affectedRows === 0) return res.status(404).json({ message: "Empleado no encontrado" });
            res.status(200).json({ message: "Empleado actualizado correctamente" });
        }
    );
};

// Eliminar un empleado
const deleteEmployee = (req, res) => {
    const { id } = req.params;
    connection.query("DELETE FROM employees WHERE id_employee = ?", [id], (error, results) => {
        if (error) throw error;
        if (results.affectedRows === 0) return res.status(404).json({ message: "Empleado no encontrado" });
        res.status(200).json({ message: "Empleado eliminado correctamente" });
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
 * /employees/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empleado obtenido correctamente
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Agregar un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               id_restaurant_fk:
 *                 type: integer
 *               role_id:
 *                 type: integer
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: integer
 *               salary:
 *                 type: number
 *               estatus:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Empleado agregado correctamente
 */

app.route("/employees").get(verifyToken, getEmployees).post(verifyToken, postEmployee);
app.route("/employees/:id").get(verifyToken, getEmployeeById).put(verifyToken, updateEmployee).delete(verifyToken, deleteEmployee);

module.exports = app;
