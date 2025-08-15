import { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../services/TodoService";
import TodoDetails from "./TodoDetails";
import {
  List,
  ListItem,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
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
      {todos.length ? (
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
