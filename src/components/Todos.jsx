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
  Pagination,
  Box,
} from "@mui/material";
import { useAuth } from "../AuthContext";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);
  const { token } = useAuth();
  const todoService = useTodoService();

  const fetchTodos = async () => {
    try {
      const data = await todoService.getTodos(
        filter,
        searchTitle,
        currentPage,
        todosPerPage
      );
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
  }, [token, filter, searchTitle, currentPage, todosPerPage]);

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      fetchTodos();
    } catch (error) {
      setError("An error occurred while deleting the todo");
    }
  };

  const totalPages = Math.ceil(todos.length / todosPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Typography variant="h2">Todos</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? <CircularProgress /> : null}

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

      <FormControl
        style={{ marginBottom: "20px", marginTop: "10px", minWidth: "120px" }}
      >
        <InputLabel>Items per page</InputLabel>
        <Select
          value={todosPerPage}
          onChange={(e) => {
            setTodosPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          label="Items per page"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>

      {todos.length ? (
        <>
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id} sx={{ width: "400px" }}>
                <TodoDetails todo={todo} onDelete={handleDelete} />
              </ListItem>
            ))}
          </List>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Typography variant="h6">No Todos Found</Typography>
      )}
    </div>
  );
};

export default Todos;
