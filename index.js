const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("El servidor escucha en el puerto " + PORT);
});

module.exports = app;
