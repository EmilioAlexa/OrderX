const express = require("express");
const { connection } = require("../config/config.db");

const router = express.Router();

router.post("/", (request, response) => {
    const { email, token } = request.body;
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    connection.query(
        "INSERT INTO auth_tokens (email, token, expiration) VALUES (?, ?, ?)",
        [email, token, expiration],
        (err) => {
            if (err) {
                return response.status(500).json({ message: "Error al guardar el token" });
            }
            response.status(200).json({ message: "Token almacenado correctamente" });
        }
    );
});

module.exports = router;
