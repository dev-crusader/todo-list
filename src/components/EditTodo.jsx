import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { useTodoService } from "../services/TodoService";

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const todoService = useTodoService();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await todoService.getTodoById(parseInt(id));
        if (data?.error) {
          setError("Couldn't fetch the todo item");
        } else {
          setTitle(data.title);
          setDone(data.done);
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      }
    };
    fetchTodo();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await todoService.updateTodo(parseInt(id), { title, done });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/todos");
      }, 2000);
    } catch (error) {
      setError("An error occurred while updating the todo");
    }
  };

  return (
    <div>
      <Typography variant="h4">Edit Todo</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Todo updated successfully!</Alert>}
      <form onSubmit={handleEdit}>
        <TextField
          label="New Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
            />
          }
          label="Completed"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={error}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditTodo;
