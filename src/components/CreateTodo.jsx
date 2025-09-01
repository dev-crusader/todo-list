import React, { useState } from "react";
import { useTodoService } from "../services/TodoService";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Alert } from "@mui/material";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const todoService = useTodoService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await todoService.createTodo(title);
      if (!response?.error) {
        setTitle("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/todos");
        }, 2000);
      } else {
        setError("Failed to create a new todo item");
      }
    } catch (error) {
      setError("An error occurred while creating the todo");
    }
  };

  return (
    <div>
      <Typography variant="h4">Create New Todo</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Todo created successfully!</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Todo"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new todo title"
        />
        <Button variant="contained" color="primary" type="submit">
          Add Todo
        </Button>
      </form>
    </div>
  );
};

export default CreateTodo;
