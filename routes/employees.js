const express = require("express");
const app = express();

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

//rutas
app.route("/employees").post(postEmployees);
app.route("/employees").get(getEmployees);

module.exports = app;