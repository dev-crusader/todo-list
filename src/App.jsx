import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Todos from "./components/Todos";
import TodoItem from "./components/TodoItem";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  alpha,
  useTheme,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  ExitToApp as LogoutIcon,
  ViewList as ListIcon,
  AccountCircle as AccountIcon,
} from "@mui/icons-material";

const App = () => {
  const { token, setToken, profile, setProfile } = useAuth();
  const theme = useTheme();

  const handleLogout = () => {
    setToken(null);
    setProfile(null);
  };

  return (
    <Router>
      <AppBar
        position="static"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderBottom: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <DashboardIcon
              sx={{
                mr: 1,
                fontSize: 32,
                color: "white",
              }}
            />
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
                background: "linear-gradient(45deg, #fff, #e0f7fa)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mr: 3,
              }}
            >
              Todo App
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {token ? (
              <>
                {profile && (
                  <Chip
                    icon={<AccountIcon />}
                    label={profile}
                    size="small"
                    sx={{
                      background: alpha("#fff", 0.1),
                      border: `1px solid ${alpha("#fff", 0.2)}`,
                      color: "white",
                      mr: 1,
                      display: { xs: "none", sm: "flex" },
                    }}
                  />
                )}

                <Button
                  color="inherit"
                  component={Link}
                  to="/todos"
                  startIcon={<ListIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    fontWeight: 500,
                    background: alpha("#fff", 0.1),
                    "&:hover": {
                      background: alpha("#fff", 0.2),
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Todos
                </Button>

                <Button
                  color="inherit"
                  component={Link}
                  to="/todos/new"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    fontWeight: 500,
                    background: alpha("#fff", 0.1),
                    "&:hover": {
                      background: alpha("#fff", 0.2),
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Create
                </Button>

                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    ml: 1,
                    background: alpha("#ff6b6b", 0.2),
                    "&:hover": {
                      background: alpha("#ff6b6b", 0.3),
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    border: `1px solid ${alpha("#fff", 0.3)}`,
                    "&:hover": {
                      background: alpha("#fff", 0.1),
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  component={Link}
                  to="/signup"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #fff, #e0f7fa)",
                    color: theme.palette.primary.main,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #fff, #b2ebf2)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Navigate to="/todos" />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todos/:id"
          element={
            <ProtectedRoute>
              <TodoItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todos/new"
          element={
            <ProtectedRoute>
              <CreateTodo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todos/:id/edit"
          element={
            <ProtectedRoute>
              <EditTodo />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
