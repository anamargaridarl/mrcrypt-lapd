import React, { useEffect } from "react";
//@core-material-ui
import {
  Grid,
  MenuItem,
  makeStyles,
  TextField,
  Button,
  Container,
} from "@material-ui/core";
//@components
import ConversationRatio from "./ConversionRatio";
//@styling
import { gray, darkGray, white, purple } from "../../styles/colors";
import { header_font_size } from "../../styles/fonts";
const axios = require('axios');

const useStyles = makeStyles((_) => ({
  container: {
    backgroundColor: gray,
  },
  leftItems: {
    paddingLeft: "3em",
    paddingRight: "6em",
    paddingTop: "1em",
  },
  rightItems: {
    paddingLeft: "6em",
    paddingRight: "3em",
    paddingTop: "1em",
  },
  title: {
    fontWeight: 1000,
    color: darkGray,
    fontSize: header_font_size,
  },
  input: {
    alignItems: "stretch",
    flexDirection: "column",
  },
  textFields: {
    "& .MuiInputBase-input": {
      backgroundColor: white,
    },
  },
  button: {
    backgroundColor: purple,
    color: white,
    margin: "3em",
    padding: "2em",
    fontWeight: "bold",
    fontSize: header_font_size,
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: purple,
      boxShadow: "none",
    },
  },
}));

export default function Converser() {
  const classes = useStyles();

  const [nameFrom, setCurrencyFrom] = React.useState("BTC");
  const [nameTo, setCurrencyTo] = React.useState("ETH");
  const [valueFrom, setValueFrom] = React.useState(0);
  const [valueTo, setValueTo] = React.useState(0);
  const [currencies, setCurrencies] = React.useState([{}]);

  useEffect(() => {
    getCoins();
  },[]);

  const getCoins = async () => {
    try {
      axios({
        method: 'get',
        url: 'http://localhost:8080/api/converser/coins'
      })
      .then((response) => {
        setCurrencies(response.data.coins);
      });  
    } catch (err) {
      console.error(err);
    }
  };

  const handleDropFrom = (event) => {
    setCurrencyFrom(event.target.value);
  };

  const handleDropTo = (event) => {
    setCurrencyTo(event.target.value);
  };

  const handleValueFrom = (event) => {
    if (parseInt(event.target.value) < 0)
      event.target.value = parseInt(event.target.value) + 1;
    setValueFrom(event.target.value);
  };

  const handleValueTo = (event) => {
    if (parseInt(event.target.value) < 0)
      event.target.value = parseInt(event.target.value) + 1;
    setValueTo(event.target.value);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container justify="space-around">
        <Grid className={classes.leftItems} item xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.title} container justify="flex-start">
            <p>From</p>
          </Grid>
        </Grid>
        <Grid className={classes.rightItems} item xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.title} container justify="flex-start">
            <p>To</p>
          </Grid>
        </Grid>
        <Grid className={classes.leftItems} item xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.input} container>
            <TextField
              className={classes.textFields}
              id="convert-from"
              type="number"
              InputLabelProps={{ shrink: true }}
              defaultValue="0"
              onChange={handleValueFrom}
              variant="outlined"
            ></TextField>
          </Grid>
        </Grid>
        <Grid className={classes.rightItems} item xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.input} container>
            <TextField
              className={classes.textFields}
              id="convert-to"
              type="number"
              InputLabelProps={{ shrink: true }}
              defaultValue="0"
              onChange={handleValueTo}
              variant="outlined"
            ></TextField>
          </Grid>
        </Grid>
        <Grid className={classes.leftItems} item xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.input} container>
            <TextField
              className={classes.textFields}
              id="drop-from"
              select
              label="Currency"
              value={nameFrom}
              onChange={handleDropFrom}
              helperText="Please select your currency"
              variant="outlined"
            >
              {currencies.map((option) => (
                <MenuItem key={option.name} value={option.code}>
                  {`${option.code} - ${option.name}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid className={classes.rightItems} item xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.input} container>
            <TextField
              className={classes.textFields}
              id="drop-to"
              select
              label="Currency"
              value={nameTo}
              onChange={handleDropTo}
              helperText="Please select your currency"
              variant="outlined"
            >
              {currencies.map((option) => (
                <MenuItem key={option.name} value={option.code}>
                  {`${option.code} - ${option.name}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ConversationRatio
            valueFrom={valueFrom}
            valueTo={valueTo}
            nameFrom={nameFrom}
            nameTo={nameTo}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid className={classes.input} container justify="center">
            <Button className={classes.button} variant="contained" >
              Convert
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
