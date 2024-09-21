import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";
import UploadWidget from "../components/UploadWidget";

const theme = createTheme();

const profileUpdatePage = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });

      setMessage(response.data.message);
      setTimeout(() => {
        updateUser(response.data.updatedUser);
        navigate("/profile");
      }, 1000);
    } catch (error) {
      console.error("Error in updating the profile: ", error);
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Profile
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              validate="true"
              sx={{ width: "100%", mt: 3 }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                defaultValue={currentUser.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                defaultValue={currentUser.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password (Leave empty if no change)"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                disabled={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
            <div className="my-2 items-center flex flex-col gap-2">
              <img
                src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
                alt="avatar"
                className="w-40 mx-auto rounded-lg "
              />
              <UploadWidget
                uwConfig={{
                  cloudName: "dp2jsbp3k",
                  uploadPreset: "homeheaven",
                  multiple: false,
                  maxImageFileSize: 20000000,
                  folder: "avatars",
                }}
                setState={setAvatar}
              />
            </div>
            {message && <Typography color="error">{message}</Typography>}
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default profileUpdatePage;
