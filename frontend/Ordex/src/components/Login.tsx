import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/style/Login.css';
import eyes from '../assets/mdi_hide.svg';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook para redirigir

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard"); // Redirigir con React Router
            } else {
                setError(data.message || "Error al iniciar sesión");
            }
        } catch (error) {
            setError("Error en el servidor. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body-container" style={{ marginLeft: '350px', marginTop: '192px' }}>
            <div className="login-container">
                <div className="login-box">
                    <h1>Login!</h1>
                    <p>Please enter your credentials below to continue</p>

                    <form onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="label-container">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="label-container">
                            <label htmlFor="password">Password</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="toggle-password"
                                >
                                    <img src={eyes} alt="Mostrar/Ocultar" />
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>

                        {/* Mostrar errores */}
                        {error && <p className="error-message">{error}</p>}

                        {/* Botón de Login */}
                        <div className="button-container">
                            <button type="submit" className="login-button" disabled={loading}>
                                {loading ? "Cargando..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <footer>
                <p>© 2025 OrderX. All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default Login;
