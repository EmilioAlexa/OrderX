const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { connection } = require("../config/config.db");

dotenv.config();

const verifyToken = (request, response, next) => {
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(403).json({ message: "Token requerido o formato incorrecto" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded; // Guardamos el usuario en la request

        //Verificar si el token aún es válido en la base de datos**
        connection.query(
            "SELECT * FROM auth_tokens WHERE email = ? AND token = ? AND expiration > NOW()",
            [decoded.email, token],
            (error, results) => {
                if (error) {
                    console.error("Error en la consulta de validación del token:", error);
                    return response.status(500).json({ message: "Error en el servidor" });
                }

                if (results.length === 0) {
                    return response.status(401).json({ message: "Token inválido o expirado. Por favor, inicia sesión de nuevo." });
                }

                next(); //  Token válido, continuar con la siguiente función
            }
        );
    } catch (error) {
        return response.status(401).json({ message: "Token inválido" });
    }
};

module.exports = verifyToken;
