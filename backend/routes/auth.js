const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { connection } = require("../config/config.db");

dotenv.config();

const router = express.Router();

// Endpoint para iniciar sesión y generar token
const login = (request, response) => {
    const { email, password } = request.body;

    // Validación básica de campos
    if (!email || !password) {
        return response.status(400).json({ 
            message: "Datos incompletos",
            details: "Email y contraseña son requeridos" 
        });
    }

    connection.query(
        "SELECT id_user, username, email, password, address, role FROM users WHERE email = ?", 
        [email], 
        async (error, results) => {
            if (error) {
                console.error("Error en la consulta SQL:", error);
                return response.status(500).json({ 
                    message: "Error en el servidor",
                    error: error.message 
                });
            }

            if (results.length === 0) {
                return response.status(401).json({ 
                    message: "Credenciales incorrectas",
                    details: "El email no está registrado" 
                });
            }

            const user = results[0];

            try {
                // Comparar contraseña con bcrypt
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return response.status(401).json({ 
                        message: "Credenciales incorrectas",
                        details: "Contraseña incorrecta" 
                    });
                }

                // Generar el token JWT
                const token = jwt.sign(
                    { 
                        id_user: user.id_user,  // Usamos id_user para consistencia
                        email: user.email,
                        role: user.role 
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                // Guardar el token en la base de datos
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 1); // 1 hora de expiración

                connection.query(
                    "INSERT INTO auth_tokens (email, token, expiration) VALUES (?, ?, ?)",
                    [user.email, token, expirationDate],
                    (error) => {
                        if (error) {
                            console.error("Error al guardar token:", error);
                            return response.status(500).json({ 
                                message: "Error al iniciar sesión",
                                details: "No se pudo guardar el token" 
                            });
                        }

                        // Respuesta exitosa (omitimos el password en la respuesta)
                        const userData = {
                            id_user: user.id_user,
                            username: user.username,
                            email: user.email,
                            address: user.address,
                            role: user.role,
                            token
                        };

                        response.status(200).json({ 
                            message: "Login exitoso",
                            user: userData 
                        });
                    }
                );
            } catch (error) {
                console.error("Error en el proceso de login:", error);
                response.status(500).json({ 
                    message: "Error en el servidor",
                    error: error.message 
                });
            }
        }
    );
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión y obtener un token de autenticación
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: contraseñaSegura123
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_user:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     address:
 *                       type: string
 *                     role:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: Datos incompletos o inválidos
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */
router.post("/login", login);

module.exports = router;