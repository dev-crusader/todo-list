import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Alert } from "@mui/material";
import { signup } from "../services/AuthService";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const response = await signup(username, password);
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError("An error occurred during signup");
    }
  };

  return (
    <div>
      <Typography variant="h4">Sign Up</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">
          Signup successful! Redirecting to login...
        </Alert>
      )}
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
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
