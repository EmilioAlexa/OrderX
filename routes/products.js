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

// Protegemos las rutas con `verifyToken`
app.route("/products/category/:category").get(verifyToken, getProductsByCategory);
app.route("/products").get(verifyToken, getProducts);
app.route("/products").post(verifyToken, postProducts);

module.exports = app;
