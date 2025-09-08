import React, { useState, useEffect } from "react";
import TodoDetails from "./TodoDetails";
import { useParams } from "react-router-dom";
import { useTodoService } from "../services/TodoService";
import { Typography, Alert } from "@mui/material";

const TodoItem = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null);
  const todoService = useTodoService();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await todoService.getTodoById(id);
        if (data?.error) {
          setError("An error occurred while fetching data");
        } else {
          setTodo(data);
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      }
    };
    fetchTodo();
  }, [id]);

  return (
    <div>
      <Typography variant="h3">Todo Item</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {todo ? (
        <TodoDetails todo={todo} />
      ) : (
        <Typography variant="h6">Todo Item Not Found</Typography>
      )}
    </div>
  );
};

export default TodoItem;
