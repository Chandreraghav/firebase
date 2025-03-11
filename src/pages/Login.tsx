import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import external CSS

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/employees");
        } catch (error: any) {
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("/employees");
        } catch (error) {
            setErrorMessage("Google login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome back</h2>
                <p className="subtext">Please enter your details</p>

                {errorMessage && <p className="error-text">{errorMessage}</p>}

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />

                <div className="options">
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        Remember for 30 days
                    </label>
                    <button className="forgot-password" onClick={() => navigate("/forgot-password")}>
                        Forgot password?
                    </button>
                </div>

                <button className="login-button" onClick={handleLogin}>Sign up</button>

                <button className="google-login" onClick={handleGoogleLogin}>
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" className="google-icon" />
                    Sign in with Google
                </button>

                <p className="signup-link">
                    Don’t have an account? <span onClick={() => navigate("/signup")}>Sign up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
