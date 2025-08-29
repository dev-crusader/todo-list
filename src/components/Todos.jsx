import React, { useState, useEffect } from "react";
import { useTodoService } from "../services/TodoService";
import TodoDetails from "./TodoDetails";
import {
  List,
  ListItem,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useAuth } from "../AuthContext";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTitle, setSearchTitle] = useState("");
  const { token } = useAuth();
  const todoService = useTodoService();

  const fetchTodos = async () => {
    try {
      const data = await todoService.getTodos(filter, searchTitle);
      if (!data?.error) {
        setTodos(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token, filter, searchTitle]);

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      fetchTodos();
    } catch (error) {
      setError("An error occurred while deleting the todo");
    }
  };

  return (
    <div>
      <Typography variant="h2">Todos</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />}

      <TextField
        label="Search by title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Filter Tasks</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter Tasks"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </FormControl>

      {!loading && todos.length ? (
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} sx={{ width: "400px" }}>
              <TodoDetails todo={todo} onDelete={handleDelete} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="h6">No Todos Found</Typography>
      )}
    </div>
  );
};

export default Todos;
