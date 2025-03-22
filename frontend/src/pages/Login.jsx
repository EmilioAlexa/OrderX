import React, { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login!</h1>
                <p>Please enter your credentials below to continue</p>

                <form>
                    {/* Username */}
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Enter your username" />

                    {/* Password */}
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
                            👁
                        </button>
                    </div>

                    {/* Remember Me */}
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>

                    {/* Login Button */}
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>

            <footer>
                <p>© 2025 OrderX. All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default Login;
