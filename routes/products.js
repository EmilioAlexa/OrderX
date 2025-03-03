const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config/config.db");

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

//rutas
app.route("/products").get(getProducts);
app.route("/products").post(postProducts);

module.exports = app;