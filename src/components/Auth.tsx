// src/components/AuthForm.jsx
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, FormEvent, useState } from "react";
import { useSignin, useSignup } from "../server/api/auth";

export const Auth: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    callback: signin,
    loading: signinLoading,
    error: signinError,
  } = useSignin();
  const {
    callback: signup,
    loading: signupLoading,
    error: signupError,
  } = useSignup();

  const loading = isSignUp ? signupLoading : signinLoading;
  const error = isSignUp ? signupError : signinError;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      signup(email, password, username);
    } else {
      signin(email, password);
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={5}
      p={4}
      boxShadow={3}
      borderRadius={2}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" align="center" mb={3}>
        {isSignUp ? "Sign Up" : "Sign In"}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        {isSignUp && (
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="body2" align="center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button
            variant="text"
            size="small"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {!isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </Typography>
      </Stack>
    </Box>
  );
};
