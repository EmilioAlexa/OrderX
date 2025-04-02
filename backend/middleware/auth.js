const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { connection } = require("../config/config.db");

dotenv.config();

const verifyToken = (request, response, next) => {
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(403).json({ 
            message: "Token requerido o formato incorrecto",
            details: "El formato debe ser: Bearer <token>"
        });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verificamos que el token tenga los campos necesarios
        if (!decoded.id_user || !decoded.email) {
            return response.status(401).json({ 
                message: "Token inválido",
                details: "El token no contiene la información necesaria"
            });
        }

        // Verificar si el token es válido en la base de datos
        connection.query(
            "SELECT * FROM auth_tokens WHERE email = ? AND token = ? AND expiration > NOW()",
            [decoded.email, token],
            (error, results) => {
                if (error) {
                    console.error("Error en la consulta de validación del token:", error);
                    return response.status(500).json({ 
                        message: "Error en el servidor",
                        error: error.message
                    });
                }

                if (results.length === 0) {
                    return response.status(401).json({ 
                        message: "Token inválido o expirado",
                        details: "Por favor, inicia sesión de nuevo"
                    });
                }

                // Añadimos toda la información del usuario a la request
                request.user = {
                    id_user: decoded.id_user,
                    email: decoded.email
                    // Puedes añadir más campos si están en el token
                };

                next(); // Token válido, continuar
            }
        );
    } catch (error) {
        console.error("Error al verificar el token:", error);
        
        let message = "Token inválido";
        if (error.name === "TokenExpiredError") {
            message = "Token expirado";
        } else if (error.name === "JsonWebTokenError") {
            message = "Token malformado";
        }

        return response.status(401).json({ 
            message,
            details: error.message
        });
    }
};

module.exports = verifyToken;