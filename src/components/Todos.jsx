import React, { useState, useEffect } from "react";
import { useTodoService } from "../services/TodoService";
import { useNavigate } from "react-router-dom";
import TodoDetails from "./TodoDetails";
import {
  Typography,
  Alert,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Pagination,
  List,
  ListItem,
  Paper,
  Container,
  Chip,
  Grid,
  InputAdornment,
  Card,
  CardContent,
  Fade,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Fab,
  Zoom,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ViewList as ViewListIcon,
  Add as AddIcon,
  Dashboard as DashboardIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import { useAuth } from "../AuthContext";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const { token } = useAuth();
  const todoService = useTodoService();
  const [viewMode, setViewMode] = useState("list");
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const result = await todoService.getTodos(
        filter,
        searchTitle,
        currentPage,
        todosPerPage
      );

      if (!result?.error) {
        setTodos(result.todos || []);
        setTotalCount(result.totalCount || 0);
      } else {
        setError(result.error);
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

  var totalPages = Math.ceil(totalCount / todosPerPage);
  if (totalPages === 0) {
    totalPages = 1;
  }

  const handlePageChange = (event, value) => {
    setLoading(true);
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateTodo = () => {
    navigate("/todos/new");
  };

  const trigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" fontWeight="700" gutterBottom>
          📝 My Tasks
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Manage your todos and stay organized
        </Typography>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {totalCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Tasks
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    color="success.main"
                    fontWeight="bold"
                  >
                    {todos.filter((t) => t.done).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    color="warning.main"
                    fontWeight="bold"
                  >
                    {todos.filter((t) => !t.done).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Card elevation={1} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Search tasks..."
                variant="outlined"
                value={searchTitle}
                onChange={(e) => {
                  setSearchTitle(e.target.value);
                  setCurrentPage(1);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Filter Tasks</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  label="Filter Tasks"
                  startAdornment={<FilterIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Tasks</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Items per page</InputLabel>
                <Select
                  value={todosPerPage}
                  onChange={(e) => {
                    setTodosPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  label="Items per page"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value={5}>5 items</MenuItem>
                  <MenuItem value={10}>10 items</MenuItem>
                  <MenuItem value={20}>20 items</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Box display="flex" justifyContent="center">
                <IconButton
                  color={viewMode === "list" ? "primary" : "default"}
                  onClick={() => setViewMode("list")}
                  sx={{ mr: 1 }}
                >
                  <ViewListIcon />
                </IconButton>
                <IconButton
                  color={viewMode === "grid" ? "primary" : "default"}
                  onClick={() => setViewMode("grid")}
                >
                  <DashboardIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {todos.length} of {totalCount} tasks
        </Typography>
        <Chip
          label={`Page ${currentPage} of ${totalPages}`}
          variant="outlined"
          size="small"
        />
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      )}

      {!loading && todos.length > 0 && (
        <Fade in={!loading} timeout={500}>
          <div>
            {viewMode === "list" ? (
              <List sx={{ mb: 3 }}>
                {todos.map((todo) => (
                  <ListItem key={todo.id} sx={{ mb: 2 }}>
                    <TodoDetails
                      todo={todo}
                      onDelete={handleDelete}
                      sx={{
                        width: "100%",
                        maxWidth: "500px",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: 3,
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Grid container spacing={3}>
                {todos.map((todo) => (
                  <Grid key={todo.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <TodoDetails
                      todo={todo}
                      onDelete={handleDelete}
                      cardView
                      sx={{
                        height: "100%",
                        minHeight: "280px",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 3,
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4} mb={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: 2,
                      fontWeight: "bold",
                    },
                  }}
                />
              </Box>
            )}
          </div>
        </Fade>
      )}

      {!loading && todos.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {searchTitle || filter !== "all"
              ? "No tasks found"
              : "No tasks yet"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchTitle || filter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Create your first task to get started"}
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleCreateTodo}
            sx={{ borderRadius: 2, px: 4 }}
          >
            Create Task
          </Button>
        </Box>
      )}

      <Zoom in={!trigger}>
        <Fab
          color="primary"
          aria-label="add todo"
          onClick={handleCreateTodo}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
          }}
        >
          <AddIcon />
        </Fab>
      </Zoom>
    </Container>
  );
};

export default Todos;
