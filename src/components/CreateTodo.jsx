import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../services/TodoService";
import { Button, TextField, Typography, Alert } from "@mui/material";

const CreateNewTodo = () => {
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTodo(title);
      setTitle("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/todos");
      }, 2000);
    } catch (error) {
      setError(error);
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

export default CreateNewTodo;
