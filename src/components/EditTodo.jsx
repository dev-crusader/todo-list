import { getTodoById, updateTodo } from "../services/TodoService";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await getTodoById(parseInt(id));
        setTitle(data.title);
        setDone(data.done);
      } catch (error) {
        setError(error);
      }
    };
    fetchTodo();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateTodo(parseInt(id), { title, done });
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
      <Typography variant="h4">Edit Todo</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Successfully edited!!</Alert>}
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
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditTodo;
