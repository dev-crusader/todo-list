import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Alert } from "@mui/material";
import { login } from "../services/AuthService";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(username, password);
      if (data.access_token) {
        setToken(data.access_token);
        navigate("/todos");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
