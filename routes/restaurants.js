const express = require("express");
const app = express();

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


//rutas
app.route("/restaurants/:id").get(getRestaurantById);
app.route("/restaurants").post(postRestaurants);
app.route("/restaurants").get(getRestaurants);

module.exports = app;