const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (request, response, next) => {
    const token = request.headers["authorization"];

    if (!token) {
        return response.status(403).json({ message: "Token requerido" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        request.user = decoded; // Guardamos el usuario en el request
        next(); // Continuamos con la ejecución de la ruta
    } catch (error) {
        return response.status(401).json({ message: "Token inválido o expirado" });
    }
};

module.exports = verifyToken;
