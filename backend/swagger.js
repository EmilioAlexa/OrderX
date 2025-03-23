const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API XD",
      version: "1.0.0",
      description: "Documentación de mi API con Swagger XD",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      }
  },
  apis: [
    "./routes/auth.js",
    "./routes/customers.js",
    "./routes/employees.js",
    "./routes/inventories.js",
    "./routes/orders.js",
    "./routes/payment_methods.js",
    "./routes/printers.js",
    "./routes/products.js",
    "./routes/restaurants.js",
    "./routes/tickets.js"

  ]
  
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
