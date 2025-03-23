import React, { useState } from "react";
import '../assets/style/Login.css'

import eyes from '../assets/mdi_hide.svg';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="body-container">
            <div className="login-container">
                <div className="login-box">
                    <h1>Login!</h1>
                    <p>Please enter your credentials below to continue</p>

                    <form>
                        {/* Username */}
                        <div className="label-container">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Enter your username" />
                        </div>

                        {/* Password */}
                        <div className="label-container">
                            <label htmlFor="password">Password</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
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
                    </form>


                    {/* Login Button */}
                        <button type="submit" className="login-button">Login</button>
                </div>
            </div>
            <footer>
                <p>© 2025 OrderX. All Rights Reserved</p>
            </footer>
        </div>
        
    );
};

export default Login;
