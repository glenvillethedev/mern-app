import { Box, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ mt: 3, textAlign: "center" }}>
      <Typography variant="body2" color="textSecondary">
        Workout Tracker © {currentYear} Glenville Maturan
      </Typography>
    </Box>
  );
};

export default Footer;
