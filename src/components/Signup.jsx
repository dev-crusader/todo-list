import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Typography, Alert } from "@mui/material";
import { signup } from "../services/AuthService";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await signup(username, password);
      if (response.error) {
        setError(response.error);
      } else {
        setError("");
        setMessage("Todo created successfully!");
      }
    } catch (error) {
      setError("An error occurred during signup");
    }
  };

  return (
    <div>
      <Typography variant="h4">Sign Up</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
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
      <Typography variant="body1">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </div>
  );
};

export default Signup;
