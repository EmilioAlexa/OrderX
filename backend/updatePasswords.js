const bcrypt = require("bcrypt");
const { connection } = require("./config/config.db"); // Asegúrate de importar la conexión a la BD

const actualizarContraseñas = async () => {
    connection.query("SELECT id_user, password FROM users", async (error, results) => {
        if (error) {
            console.error("Error al obtener usuarios:", error);
            return;
        }

        for (const user of results) {
            if (!user.password.startsWith("$2b$")) { // Verifica si ya está hasheada
                const hashedPassword = await bcrypt.hash(user.password, 10);

                connection.query(
                    "UPDATE users SET password = ? WHERE id_user = ?",
                    [hashedPassword, user.id_user],
                    (err) => {
                        if (err) {
                            console.error(`Error al actualizar la contraseña del usuario ${user.id_user}:`, err);
                        } else {
                            console.log(`Contraseña actualizada para el usuario ${user.id_user}`);
                        }
                    }
                );
            }
        }

        console.log("🎉 ¡Todas las contraseñas han sido actualizadas correctamente!");
        connection.end(); // Cierra la conexión después de actualizar todas las contraseñas
    });
};

actualizarContraseñas();
