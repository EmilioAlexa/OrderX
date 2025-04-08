import axios from "axios";

// Create Axios instance
const api = axios.create({
    baseURL: "http://18.117.184.66:3000", // Use environment variable if available
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to set the token dynamically
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
        
        api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        localStorage.removeItem("token");
        delete api.defaults.headers.Authorization;
    }
};

// Attach token to every request if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));


api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        alert("Tu sesión ha expirado, inicia sesión nuevamente.");
        setAuthToken(null); // Remove token
        window.location.href = "/login"; // Redirect
    }
    return Promise.reject(error);
});

export default api;
