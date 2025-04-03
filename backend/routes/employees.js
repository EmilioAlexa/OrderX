const express = require("express");
const app = express();
const verifyToken = require("../middleware/auth"); // Importamos el middleware
const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config/config.db");

const getEmployees = (request, response) => {
    connection.query("SELECT * FROM employees WHERE estatus = 1",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const postEmployees = (request, response) => {
    const { name, id_restaurant_fk, role_id, email, phone, age, salary } = request.body;

    // Consulta SQL corregida con los valores en el orden correcto
    const query = `INSERT INTO employees (name, id_restaurant_fk, role_id, email, phone, age, salary, estatus) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, 1)`;
    const values = [name, id_restaurant_fk, role_id, email, phone, age, salary];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error("Error al insertar empleado:", error);
            return response.status(500).json({ error: "Error al insertar el empleado" });
        }
        response.status(201).json({ message: "Empleado añadido correctamente", id: results.insertId });
        console.log("Empleado insertado con ID:", results.insertId);
    });
};



const deleteemploy = (request, response) => {
    const { id_employee } = request.body;

    if (!id_employee) {
        return response.status(400).json({ error: "id_employee is required" });
    }

    connection.query(
        "UPDATE employees SET estatus = 0 WHERE id_employee = ?",
        [id_employee],
        (error, results) => {
            if (error) {
                console.error("Error updating employee status:", error);
                return response.status(500).json({ error: "Internal Server Error" });
            }

            if (results.affectedRows === 0) {
                return response.status(404).json({ message: "Employee not found" });
            }

            response.status(200).json({ message: "Employee status updated to inactive" });
            console.log("Employee deleted logically:", id_employee);
        }
    );
};

const updateEmployee = (request, response) => {
    const { id_employee, name, role_id, id_restaurant_fk, email, phone, age, salary } = request.body;

    // Verificar que el ID del empleado está presente
    if (!id_employee) {
        return response.status(400).json({ error: "id_employee is required" });
    }

    // Construcción dinámica de la consulta para actualizar solo los campos proporcionados
    let fields = [];
    let values = [];

    if (name) {
        fields.push("name = ?");
        values.push(name);
    }
    if (role_id) {
        fields.push("role_id = ?");
        values.push(role_id);
    }
    if (id_restaurant_fk) {
        fields.push("id_restaurant_fk = ?");
        values.push(id_restaurant_fk);
    }
    if (email) {
        fields.push("email = ?");
        values.push(email);
    }
    if (phone) {
        fields.push("phone = ?");
        values.push(phone);
    }
    if (age) {
        fields.push("age = ?");
        values.push(age);
    }
    if (salary) {
        fields.push("salary = ?");
        values.push(salary);
    }

    // Si no hay campos para actualizar, retornar un error
    if (fields.length === 0) {
        return response.status(400).json({ error: "No fields to update" });
    }

    // Agregar id_employee al final del array de valores
    values.push(id_employee);

    // Ejecutar la consulta UPDATE
    const query = `UPDATE employees SET ${fields.join(", ")} WHERE id_employee = ?`;

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error("Error updating employee:", error);
            return response.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return response.status(404).json({ message: "Employee not found" });
        }

        response.status(200).json({ message: "Employee updated successfully" });
        console.log("Employee updated:", request.body);
    });
};

// Agregar la ruta de actualización con método PUT
app.route("/employees").put(verifyToken, updateEmployee);
app.route("/employees").post(verifyToken, postEmployees);
app.route("/employees").get(verifyToken, getEmployees);
app.route("/employees").delete(verifyToken, deleteemploy);

module.exports = app;