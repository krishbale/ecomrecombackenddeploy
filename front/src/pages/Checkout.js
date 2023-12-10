import { Button } from "../components/Button";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useState, useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import Payment from "./Payment";
import Review from "./Review";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";

const steps = ["Shipping address", "Review your order"];

const theme = createTheme();

export default function Checkout() {
  const history = useNavigate();
  const { username } = useContext(LoginContext);
  if (username === undefined) {
    history("/login");
  }

  const [userData, setUserData] = useState([]);
  const getdetails = async () => {
    try {
      const { data } = await axios.get("/sdetails");
      let sdetails = data;
      setUserData(sdetails);
      console.log(userData);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getdetails();
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm userData={userData} />;
      case 1:
        return <Review userData={userData} />;

      default:
        throw new Error("Unknown step");
    }
  }
  const handleNext = () => {
    if (steps) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout Page
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Payment />
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
