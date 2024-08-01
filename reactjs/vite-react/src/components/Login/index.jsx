import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Snackbar } from "@mui/material";

import { formDataToJson } from "../../utils/helpers";
import schema from "./schemaValidation";
import { severity } from "../../utils/constants";
import useLocalstorage from "../../hooks/useLocalstorage";

export default function SignIn() {
  const navigate = useNavigate();
  const { setItem } = useLocalstorage();
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

    setItem("token", "token");

    navigate("/");
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" style={{ cursor: "pointer" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" style={{ cursor: "pointer" }}>
                <span
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
