import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Typography, Alert } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // TODO: Call the login function with username and password
      // TODO: If the response contains a access_token field, store it in the token state
      // TODO: If no token is received, set an error message
      const response = await login(username, password);
      if (response["access_token"]) {
        setToken(response["access_token"]);
      } else {
        setError("No token received");
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
      {token && <Typography variant="h3">{token}</Typography>}
      <Typography variant="body1">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </div>
  );
};

export default Login;
