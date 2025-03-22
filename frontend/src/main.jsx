import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app"; // Importa el componente principal


// React Router (si usas rutas en la app)
import { BrowserRouter } from "react-router-dom";

// Renderiza la app en el DOM
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
