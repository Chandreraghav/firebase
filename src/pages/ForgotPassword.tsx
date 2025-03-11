import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; 

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/"); 
      }, 3000);
      
    } catch (err: any) {
      console.error(err);
      setError("Failed to send password reset email. Try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <p className="subtext">
          Enter your e-mail address, and we’ll give you reset instructions.
        </p>

        <input
          type="email"
          className="input-field"
          placeholder="Enter e-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="reset-button" onClick={handleReset}>
          Send New Password
        </button>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button className="back-to-login" onClick={() => navigate("/")}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
