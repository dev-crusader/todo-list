import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Todos from "./components/Todos";
import TodoItem from "./components/TodoItem";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";

const App = () => {
  const { token, setToken } = useAuth();

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>

          {token ? (
            <>
              <Button color="inherit" component={Link} to="/todos">
                Todos
              </Button>
              <Button color="inherit" component={Link} to="/todos/new">
                Create Todo
              </Button>
              <Button color="inherit" onClick={() => handleLogout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
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
