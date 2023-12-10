import React, { useState } from "react";

import { regexPassword, mailformat } from "../utils";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Register = () => {
  const [setAlert] = useState(false);
  const [setAlertMsg] = useState("");
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

  const PostData = async (e) => {
    e.preventDefault();

    const { username, password } = user;
    try {
      const res = await fetch("/register", {
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
        setAlertMsg("registeration failed");
        setAlert(true);
        window.alert("Registeration failed");
      } else {
        window.alert("Registeration successfull");
        history("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={PostData} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id="username"
              label="Email"
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
              error={errors.password}
              helperText={
                errors.password &&
                "Must Includes (a   upper ,lower ,number,special character) & 8 - 32 characters long"
              }
              name="password"
              label="Password"
              type="password"
              id="password"
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
              Create Account
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an Account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
