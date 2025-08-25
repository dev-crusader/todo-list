import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Todos from "./components/Todos";
import TodoItem from "./components/TodoItem";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Button color="inherit" component={Link} to="/todos">
            Todos
          </Button>
          <Button color="inherit" component={Link} to="/todos/new">
            Create Todo
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route exact path="/" element={<Todos />} />
        <Route exact path="/todos" element={<Todos />} />
        <Route path="/todos/:id" element={<TodoItem />} />
        <Route path="/todos/new" element={<CreateTodo />} />
        <Route path="/todos/:id/edit" element={<EditTodo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
