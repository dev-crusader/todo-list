import { Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <WarningAmberIcon color="warning" fontSize="large" />
      <Typography variant="h4">"404 - Page Not Found"</Typography>
      <Typography variant="body1">Page doesn't exist</Typography>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default NotFound;
