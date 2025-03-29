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
import { PersonAddOutlined } from "@mui/icons-material";

import useSignup from "../hooks/useSignupHook";

import Footer from "../components/Footer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { error, isLoading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (email.length > 255) {
      setFormError("Email must be 255 characters or less.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    await signup(email, password);
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
        <a href="/signup">
          <img src="/img/Logo.png?v=2" alt="Logo" style={{ width: "70%" }} />
        </a>
      </Box>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: "100%" }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
            Sign-up
          </Typography>
        </Box>
        {(error || formError) && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            onClose={() => {
              setFormError(null);
            }}
          >
            {error || formError}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
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
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, padding: 1 }}
            startIcon={<PersonAddOutlined />}
            loading={isLoading}
            loadingPosition="start"
          >
            {isLoading ? "Signing Up" : "Sign Up"}
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Login
            </a>
          </Typography>
        </Box>
      </Paper>
      <Footer />
    </Container>
  );
};

export default SignUp;