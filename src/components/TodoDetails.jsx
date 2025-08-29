import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const TodoDetails = ({ todo, onDelete }) => {
  return (
    todo && (
      <Card variant="outlined" sx={{ marginBottom: 2, width: "300px" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Title: {todo.title}
          </Typography>
          <Typography color="text.secondary">
            Status: {todo.done ? "Completed" : "Pending"}
          </Typography>
        </CardContent>
        <CardActions>
          {onDelete && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </Button>
          )}
          <Link
            to={`/todos/${todo.id}/edit`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined" color="primary">
              Edit
            </Button>
          </Link>
        </CardActions>
      </Card>
    )
  );
};

export default TodoDetails;
