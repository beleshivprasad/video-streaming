import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

import schema from "./schemaValidation";
import { formDataToJson } from "../../utils/helpers";
import { severity } from "../../utils/constants";

export default function SignUp() {
  const navigate = useNavigate();

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("");

  const validateSchema = async data => {
    try {
      await schema.validate(data, { abortEarly: false });
      return true;
    } catch (error) {
      showSnacBar(error.inner[0].message, severity.error);
      return false;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = formDataToJson(new FormData(event.currentTarget));

    const isSchemaValid = await validateSchema(data);

    if (!isSchemaValid) return;

    // Make an API call.
    console.log(data);
  };

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") return;
    setIsSnackBarOpen(false);
    setSnackBarMessage("");
    setSnackBarSeverity("");
  };

  const showSnacBar = (message, severity) => {
    setIsSnackBarOpen(true);
    setSnackBarMessage(message);
    setSnackBarSeverity(severity);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={closeSnackBar}
      >
        <Alert
          onClose={closeSnackBar}
          severity={snackBarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" style={{ cursor: "pointer" }}>
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Already have an account? Sign in
                </span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
