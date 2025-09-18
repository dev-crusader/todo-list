import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/AuthService";
import {
  TextField,
  Typography,
  Alert,
  Button,
  Box,
  Paper,
  Container,
  InputAdornment,
  Fade,
  Slide,
  Divider,
  alpha,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  HowToReg as SignupIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          background: "#ffffff",
        }}
      >
        <Slide direction="up" in={true} timeout={500}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 3,
              width: "100%",
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.background.paper,
                0.95
              )} 0%, ${alpha(theme.palette.grey[50], 0.9)} 100%)`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                background: `radial-gradient(circle at top right, ${alpha(
                  theme.palette.secondary.light,
                  0.1
                )}, transparent 400px)`,
                pointerEvents: "none",
              },
            }}
          >
            <IconButton
              component={Link}
              to="/login"
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                color: theme.palette.text.secondary,
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: `radial-gradient(${alpha(
                  theme.palette.secondary.light,
                  0.2
                )}, transparent 70%)`,
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <SignupIcon sx={{ fontSize: 30, color: "white" }} />
              </Box>
              <Typography
                component="h1"
                variant="h4"
                fontWeight="700"
                color="primary"
                gutterBottom
              >
                Create Account
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Join us and start organizing your tasks today
              </Typography>
            </Box>

            <Divider sx={{ mb: 3, opacity: 0.5 }} />

            <Box sx={{ mb: 2, minHeight: 80 }}>
              {error && (
                <Fade in={!!error} timeout={300}>
                  <Alert
                    severity="error"
                    sx={{
                      borderRadius: 2,
                      background: alpha(theme.palette.error.main, 0.1),
                      color: theme.palette.error.dark,
                      border: `1px solid ${alpha(
                        theme.palette.error.main,
                        0.2
                      )}`,
                    }}
                    onClose={() => setError("")}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}

              {success && (
                <Fade in={success} timeout={300}>
                  <Alert
                    severity="success"
                    sx={{
                      borderRadius: 2,
                      background: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.dark,
                      border: `1px solid ${alpha(
                        theme.palette.success.main,
                        0.2
                      )}`,
                    }}
                  >
                    Signup successful! Redirecting to login...
                  </Alert>
                </Fade>
              )}
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background: alpha(theme.palette.background.paper, 0.8),
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: alpha(theme.palette.background.paper, 0.9),
                    },
                    "&.Mui-focused": {
                      background: theme.palette.background.paper,
                      boxShadow: `0 0 0 2px ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                    },
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background: alpha(theme.palette.background.paper, 0.8),
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: alpha(theme.palette.background.paper, 0.9),
                    },
                    "&.Mui-focused": {
                      background: theme.palette.background.paper,
                      boxShadow: `0 0 0 2px ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                    },
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                        size="small"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background: alpha(theme.palette.background.paper, 0.8),
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: alpha(theme.palette.background.paper, 0.9),
                    },
                    "&.Mui-focused": {
                      background: theme.palette.background.paper,
                      boxShadow: `0 0 0 2px ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                startIcon={<SignupIcon />}
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  boxShadow: `0 4px 12px ${alpha(
                    theme.palette.primary.main,
                    0.3
                  )}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 6px 16px ${alpha(
                      theme.palette.primary.main,
                      0.4
                    )}`,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  },
                }}
              >
                Create Account
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Button
                    component={Link}
                    to="/login"
                    size="small"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign in
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Slide>
      </Box>
    </Container>
  );
};

export default Signup;
