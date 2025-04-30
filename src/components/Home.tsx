// src/pages/Home.jsx
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSignout } from "../server/api/auth";
import { useGetCurrentUser } from "../server/api/user";
import { Scores } from "./Scores";

export const Home: FC = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useGetCurrentUser();
  const { callback: signout } = useSignout();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Benvenuto in FootyTinni!
          </Typography>

          {user?.is_admin && (
            <Button color="inherit" onClick={() => navigate("/admin")}>
              Admin
            </Button>
          )}

          <Button color="inherit" onClick={signout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Box mt={4}>
          <Scores />
        </Box>
      </Container>
    </>
  );
};
