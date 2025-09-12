import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Fade,
  alpha,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  ArrowForward as ArrowForwardIcon,
  StarBorder as StarBorderIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";

const TodoDetails = ({ todo, onDelete, cardView = false, sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!todo) return null;

  const cardGradient = todo.done
    ? `linear-gradient(135deg, ${alpha(
        theme.palette.success.light,
        0.1
      )} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`
    : `linear-gradient(135deg, ${alpha(
        theme.palette.primary.light,
        0.1
      )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`;

  const accentColor = `hsl(90, 70%, 60%)`;

  return (
    <Fade in={true} timeout={500}>
      <Card
        variant="outlined"
        sx={{
          height: cardView ? "100%" : "auto",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          border: `1px solid ${alpha(
            todo.done ? theme.palette.success.main : theme.palette.grey[300],
            0.3
          )}`,
          background: cardGradient,
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${accentColor}, ${
              todo.done
                ? theme.palette.success.main
                : theme.palette.primary.main
            })`,
            opacity: 0.8,
          },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 8px 24px ${alpha(
              todo.done
                ? theme.palette.success.main
                : theme.palette.primary.main,
              0.15
            )}`,
            borderColor: todo.done
              ? theme.palette.success.main
              : theme.palette.primary.main,
            "&:before": {
              opacity: 1,
            },
          },
          ...sx,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            opacity: 0.1,
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          }}
        />

        <CardContent sx={{ flexGrow: 1, p: 3, pt: 4 }}>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Chip
              icon={todo.done ? <CheckCircleIcon /> : <UncheckedIcon />}
              label={todo.done ? "COMPLETED" : "PENDING"}
              color={todo.done ? "success" : "default"}
              variant={todo.done ? "filled" : "outlined"}
              size="small"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                backgroundColor: todo.done
                  ? alpha(theme.palette.success.main, 0.75)
                  : alpha(theme.palette.grey[500], 0.1),
              }}
            />

            {todo.createdAt && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AccessTimeIcon
                  sx={{ fontSize: 14, color: "text.secondary" }}
                />
                <Typography variant="caption" color="text.secondary">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            )}
          </Box>

          <Divider sx={{ mb: 2, opacity: 0.5 }} />

          <Box sx={{ position: "relative", mb: 2 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: todo.done ? "text.secondary" : "text.primary",
                textDecoration: todo.done ? "line-through" : "none",
                wordBreak: "break-word",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: cardView ? "72px" : "auto",
                paddingLeft: 2,
                borderLeft: `3px solid ${alpha(accentColor, 0.5)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderLeft: `3px solid ${accentColor}`,
                  paddingLeft: 3,
                },
              }}
            >
              {todo.title}
            </Typography>
          </Box>

          {todo.description && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 1,
                backgroundColor: alpha(theme.palette.grey[200], 0.5),
                border: `1px solid ${alpha(theme.palette.grey[300], 0.3)}`,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                {todo.description}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: "auto", pt: 2 }}>
            <Chip
              icon={<StarBorderIcon sx={{ fontSize: 14 }} />}
              label={`ID: ${todo.id}`}
              variant="outlined"
              size="small"
              sx={{
                fontSize: "0.7rem",
                backgroundColor: alpha(accentColor, 0.1),
                borderColor: alpha(accentColor, 0.3),
                color: "text.secondary",
              }}
            />
          </Box>
        </CardContent>

        <Divider sx={{ opacity: 0.5 }} />

        <CardActions
          sx={{
            p: 2,
            justifyContent: "space-between",
            background: alpha(theme.palette.grey[100], 0.3),
          }}
        >
          <Box>
            {onDelete && (
              <IconButton
                color="error"
                onClick={() => onDelete(todo.id)}
                size="small"
                sx={{
                  mr: 1,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.error.main,
                    color: "white",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>

          <Link
            to={`/todos/${todo.id}/edit`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: 2,
                px: 2,
                textTransform: "none",
                fontWeight: 500,
                background: `${theme.palette.primary.main}`,
                boxShadow: `0 2px 8px ${alpha(
                  theme.palette.primary.main,
                  0.3
                )}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: `0 4px 12px ${alpha(
                    theme.palette.primary.main,
                    0.4
                  )}`,
                },
              }}
            >
              {isMobile ? "Edit" : "Edit Todo"}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Fade>
  );
};

export default TodoDetails;
