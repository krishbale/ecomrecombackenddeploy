import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useCartContext } from "../context/Cartcontext";
import Esewa from "../assets/esewa_logo.png";
import { LoginContext } from "../App";
import Grid from "@mui/material/Grid";

export default function Review({ userData }) {
  const { address1, address2, city, country, firstName, lastName, zip } =
    userData;

  const { username } = useContext(LoginContext);

  const { cart, totalAmount } = useCartContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalAmount}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Address Details:-
          </Typography>
          <Typography gutterBottom>
            {firstName} {lastName}
          </Typography>
          <Typography gutterBottom></Typography>
          <Typography gutterBottom>
            {city},{country}
          </Typography>
          <Typography gutterBottom>Postal Code:{zip}</Typography>

          <Typography gutterBottom>Primary Address:{address1}</Typography>
          <Typography gutterBottom>Secondary Address:{address2}</Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Email
          </Typography>
          <Typography gutterBottom>Order Placed by:-</Typography>
          <Typography gutterBottom>{username}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Select Payment Method:</Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Available Payment Method:
            <Typography>
              1. ESEWA <br /> <img width={120} src={Esewa} alt="esewa" />
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
