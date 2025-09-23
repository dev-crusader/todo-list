import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Container,
  Paper,
  alpha,
  useTheme,
  Fade,
  Slide,
} from "@mui/material";
import {
  WarningAmber as WarningIcon,
  Home as HomeIcon,
  ArrowBack as BackIcon,
  SearchOff as SearchOffIcon,
} from "@mui/icons-material";

const NotFound = () => {
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          background: "#ffffff",
        }}
      >
        <Slide direction="up" in={true} timeout={600}>
          <Paper
            elevation={8}
            sx={{
              p: 6,
              borderRadius: 4,
              textAlign: "center",
              width: "100%",
              maxWidth: 600,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.background.paper,
                0.95
              )} 0%, ${alpha(theme.palette.grey[50], 0.9)} 100%)`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                background: `radial-gradient(circle at top right, ${alpha(
                  theme.palette.warning.light,
                  0.1
                )}, transparent 400px)`,
                pointerEvents: "none",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: `radial-gradient(${alpha(
                  theme.palette.warning.light,
                  0.2
                )}, transparent 70%)`,
                opacity: 0.4,
                pointerEvents: "none",
              }}
            />

            <Fade in={true} timeout={800}>
              <Box>
                <Box
                  sx={{
                    position: "relative",
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: `linear-gradient(45deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      mb: 2,
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%": {
                          transform: "scale(1)",
                          boxShadow: `0 0 0 0 ${alpha(
                            theme.palette.warning.main,
                            0.7
                          )}`,
                        },
                        "70%": {
                          transform: "scale(1.05)",
                          boxShadow: `0 0 0 20px ${alpha(
                            theme.palette.warning.main,
                            0
                          )}`,
                        },
                        "100%": {
                          transform: "scale(1)",
                          boxShadow: `0 0 0 0 ${alpha(
                            theme.palette.warning.main,
                            0
                          )}`,
                        },
                      },
                    }}
                  >
                    <SearchOffIcon sx={{ fontSize: 60, color: "white" }} />
                  </Box>

                  <WarningIcon
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      fontSize: 40,
                      color: theme.palette.warning.main,
                      background: "white",
                      borderRadius: "50%",
                      p: 0.5,
                      boxShadow: 2,
                    }}
                  />
                </Box>

                <Typography
                  variant="h1"
                  component="h1"
                  fontWeight="800"
                  color="warning.dark"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                    background: `linear-gradient(45deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  404
                </Typography>

                <Typography
                  variant="h4"
                  component="h2"
                  fontWeight="600"
                  color="text.primary"
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  Oops! Page Not Found
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mb: 4,
                    maxWidth: 400,
                    margin: "0 auto",
                    fontSize: "1.1rem",
                  }}
                >
                  It seems like the page you're looking for doesn't exist, might
                  have been moved, or is temporarily unavailable.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    size="large"
                    startIcon={<HomeIcon />}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      boxShadow: `0 4px 12px ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 6px 16px ${alpha(
                          theme.palette.primary.main,
                          0.4
                        )}`,
                      },
                    }}
                  >
                    Go Home
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<BackIcon />}
                    onClick={() => window.history.back()}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      borderWidth: 2,
                      borderColor: theme.palette.warning.main,
                      color: theme.palette.warning.dark,
                      "&:hover": {
                        borderWidth: 2,
                        background: alpha(theme.palette.warning.main, 0.1),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Go Back
                  </Button>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    mt: 4,
                    fontStyle: "italic",
                  }}
                >
                  If you believe this is an error, please contact support or try
                  again later.
                </Typography>
              </Box>
            </Fade>
          </Paper>
        </Slide>
      </Box>
    </Container>
  );
};

export default NotFound;
