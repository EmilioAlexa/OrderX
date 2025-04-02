const express = require("express");
const { swaggerUi, swaggerSpec } = require("./swagger");
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");

app.use(cors({ 
    origin: "http://localhost:4000", // Permite solo tu frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

// Cargar rutas
app.use(require("./routes/auth"));  // Ruta de autenticación
app.use(require("./routes/restaurants"));
app.use(require("./routes/employees"));
app.use(require("./routes/inventories"));
app.use(require("./routes/payment_methods"));
app.use(require("./routes/products"));
app.use(require("./routes/customers"));
app.use(require("./routes/orders"));
app.use(require("./routes/printers"));
app.use(require("./routes/tickets"));
app.use("/auth", require("./routes/auth"));  // 📌 Esto asegura que la ruta sea /auth/login

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("El servidor escucha en el puerto " + PORT);
});

module.exports = app;
