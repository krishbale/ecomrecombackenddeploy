import React, { useContext, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { regexPassword, mailformat } from "../utils";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { LoginContext } from "../App";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Typography } from "@mui/material";
import InstantMessage from "../components/InstantMessage";
const Login = () => {
  const [alert, setAlert] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  const { dispatch } = useContext(LoginContext);
  const history = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState(false);
  const handleInputs = (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;
    let iscorrectvalue =
      name === "username" ? mailformat.test(value) : regexPassword.test(value);
    iscorrectvalue
      ? setErrors({ ...errors, [name]: false })
      : setErrors({ ...errors, [name]: true });
    setUser({ ...user, [name]: value });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = user;
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Invalid Credentials");
        setAlertMsg("Invalid Credentials ");
        setAlert(true);
      } else {
        window.alert(`Login Successfull`);
        dispatch({ type: "USER", payload: username });
        history("/");
      }
      setAlert(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {alert ? <InstantMessage message={alertmsg} /> : ``}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id="username"
              label=" Email"
              name="username"
              error={errors.username}
              helperText={
                errors.username &&
                "Any character other than white-space is allowed, length between 8 and 24."
              }
              autoFocus
              onChange={handleInputs}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={errors.password}
              helperText={
                errors.password &&
                "Must Includes (a   upper ,lower ,number,special character) & 8 - 32 characters long"
              }
              onChange={handleInputs}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
