import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
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
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Title as TitleIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  Edit as EditIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { useTodoService } from "../services/TodoService";

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const todoService = useTodoService();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const data = await todoService.getTodoById(id);
        if (data?.error) {
          setError("Couldn't fetch the todo item");
        } else {
          setTitle(data.title);
          setDescription(data.description);
          setDone(data.done);
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    try {
      setError(null);
      await todoService.updateTodo(parseInt(id), { title, done, description });
      setSuccess(true);
      setTimeout(() => {
        navigate("/todos");
      }, 1500);
    } catch (error) {
      setError("An error occurred while updating the todo");
    }
  };

  const handleCancel = () => {
    navigate("/todos");
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <Typography variant="h6" color="textSecondary">
            Loading todo...
          </Typography>
        </Box>
      </Container>
    );
  }

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
            mb={2}
            justifyContent="center"
          >
            <EditIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
            <Typography
              variant="h4"
              component="h1"
              fontWeight="600"
              color="primary"
            >
              Edit Todo
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
                    mx: 1,
                  }}
                  icon={<CheckCircleIcon fontSize="inherit" />}
                >
                  Todo updated successfully! Redirecting...
                </Alert>
              </Zoom>
            )}
          </Box>

          <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent sx={{ p: 3, m: 3 }}>
              <form onSubmit={handleEdit}>
                <TextField
                  label="Todo Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={error && !title.trim()}
                  helperText={
                    error && !title.trim() ? "Title is required" : " "
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 1,
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

                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<UncheckedIcon />}
                      checkedIcon={
                        <CheckCircleIcon
                          color={done ? "success" : "text.primary"}
                        />
                      }
                      checked={done}
                      onChange={(e) => setDone(e.target.checked)}
                      sx={{
                        transform: "scale(1.2)",
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="h6"
                      color={done ? "success" : "text.primary"}
                    >
                      {done ? "Completed" : "Pending"}
                    </Typography>
                  }
                  sx={{
                    mb: 2,
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: done ? "primary.50" : "transparent",
                    transition: "background-color 0.3s ease",
                  }}
                />

                <Box
                  display="flex"
                  gap={4}
                  justifyContent="flex-end"
                  flexWrap="wrap"
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!title.trim()}
                    startIcon={<SaveIcon />}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Editing Todo ID: {id}
          </Typography>
        </Paper>
      </Slide>
    </Container>
  );
};

export default EditTodo;
