import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import useLogin from "../hooks/useLoginHook";

import Footer from "../components/Footer";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <a href="/login">
          <img
            src="../../../img/Logo.png?v=2"
            alt="Logo"
            style={{ width: "70%" }}
          />
        </a>
      </Box>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: "100%" }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
            Login
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoFocus={true}
            autoComplete="off"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<LoginIcon />}
            sx={{ mt: 2, padding: 1 }}
            loading={isLoading}
            loadingPosition="start"
          >
            {isLoading ? "Logging In" : "Log In"}
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <a
              href="/signup"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Sign Up
            </a>
          </Typography>
        </Box>
      </Paper>
      <Footer />
    </Container>
  );
};

export default LogIn;
