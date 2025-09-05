import React, { useState } from "react";
import { useTodoService } from "../services/TodoService";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Alert,
  Box,
  Paper,
  Container,
  Divider,
  InputAdornment,
  Card,
  CardContent,
  Slide,
  Zoom,
} from "@mui/material";

import {
  Add as AddIcon,
  Title as TitleIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const todoService = useTodoService();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Todo title cannot be empty");
      return;
    }
    try {
      setError(null);
      const response = await todoService.createTodo({ title, description });
      if (!response?.error) {
        setTitle("");
        setDescription("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/todos");
        }, 1500);
      } else {
        setError("Failed to create a new todo item");
      }
    } catch (error) {
      setError("An error occurred while creating the todo");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Slide direction="down" in={true} timeout={500}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #ffffff 0%, #e4e8f0 100%)",
            position: "relative",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <AddIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
            <Typography
              variant="h4"
              component="h1"
              fontWeight="600"
              color="primary"
            >
              Create New Todo
            </Typography>
          </Box>

          <Divider />

          <Box
            sx={{
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {error && (
              <Zoom in={!!error} timeout={300}>
                <Alert
                  severity="error"
                  sx={{
                    borderRadius: 1,
                    width: "100%",
                    mx: 1,
                  }}
                  onClose={() => setError(null)}
                >
                  {error}
                </Alert>
              </Zoom>
            )}

            {!error && success && (
              <Zoom in={success} timeout={300}>
                <Alert
                  severity="success"
                  sx={{
                    borderRadius: 1,
                    width: "100%",
                  }}
                  icon={<CheckCircleIcon fontSize="inherit" />}
                >
                  Todo created successfully!
                </Alert>
              </Zoom>
            )}
          </Box>

          <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent sx={{ p: 3, m: 3 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Todo Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={!!error && !title.trim()}
                  helperText={
                    error && !title.trim()
                      ? "Title is required"
                      : "Enter what you need to do"
                  }
                  placeholder="Enter a new todo title..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  label="Todo Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon color="action" />{" "}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!title.trim()}
                    startIcon={<AddIcon />}
                    size="large"
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    Add Todo
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              💡 Tip: Keep your todos specific and actionable for better
              productivity!
            </Typography>
          </Paper>
        </Paper>
      </Slide>
    </Container>
  );
};

export default CreateTodo;
