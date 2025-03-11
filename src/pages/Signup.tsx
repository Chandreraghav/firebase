import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; 

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setMessage("");

    if (!name || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setMessage("Verification email sent! Please check your inbox.");

      setTimeout(() => navigate("/"), 3000);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <p className="subtext">Start your journey</p>
        <h2>Sign Up to InsideBox</h2>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
          </button>
        </div>

        <button onClick={handleSignup} className="signup-button">Sign up</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;

