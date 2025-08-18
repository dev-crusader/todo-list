import { useParams } from "react-router-dom";
import TodoDetails from "./TodoDetails";
import { getTodoById } from "../services/TodoService";
import { Typography } from "@mui/material";
import { useState } from "react";

const TodoItem = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await getTodoById(parseInt(id));
        setTodo(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchTodo();
  }, [id]);

  return (
    <div>
      <Typography variant="h3">Todo Item</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TodoDetails todo={todo} />
    </div>
  );
};

export default TodoItem;
