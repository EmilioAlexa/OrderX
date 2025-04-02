import axios from "axios";

const API_URL = "http://18.117.184.66:3000"; // Ajusta según el backend

// Función para obtener la información de un usuario por su ID
export const getUserById = async (userId: number) => {
    try {
        const token = localStorage.getItem("token"); // Recuperar el token
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo el usuario", error);
        throw error;
    }
};

// Función para actualizar la información de un usuario
export const updateUser = async (userId: number, userData: any) => {
    try {
        const token = localStorage.getItem("token"); // Recuperar el token
        const response = await axios.put(`${API_URL}/user/${userId}`, userData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error actualizando el usuario", error);
        throw error;
    }
};
