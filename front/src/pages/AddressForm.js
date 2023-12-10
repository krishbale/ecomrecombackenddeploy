import * as React from "react";
import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import { Button } from "../components/Button";

export default function AddressForm({ userData }) {
  const { address1, address2, city, country, firstName, lastName, state, zip } =
    userData;
  const [shippingaddress, setShippingAddress] = React.useState({
    firstname: "",

    lastname: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const handleInputs = (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    setShippingAddress({ ...shippingaddress, [name]: value });
  };
  const handleShipForm = async (e) => {
    e.preventDefault();
    const {
      firstName,

      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      country,
    } = shippingaddress;
    console.log(shippingaddress.firstname);
    try {
      const res = await fetch("/shippingform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,

          lastName,
          address1,
          address2,
          city,
          state,
          zip,
          country,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Registeration failed");
        console.log(data);
      } else {
        window.alert("Registeration successfull");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid
        component="form"
        onSubmit={handleShipForm}
        container
        noValidate
        spacing={3}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={firstName}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleInputs}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={lastName}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handleInputs}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={address1}
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleInputs}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            value={address2}
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleInputs}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            value={city}
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleInputs}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={state}
            variant="standard"
            onChange={handleInputs}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            value={zip}
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleInputs}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={country}
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleInputs}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit">Submit </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
