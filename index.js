const express   = require("express");
const app       = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cargamos el archivo de las rutas
app.use(require('./routes/restaurants.js'));
app.use(require('./routes/employees.js'));
app.use(require('./routes/inventories.js'));
app.use(require('./routes/payment_methods.js'));
app.use(require('./routes/products.js'));



const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log('El servidor escucha en el puerto '+ PORT);
});

module.exports = app;

