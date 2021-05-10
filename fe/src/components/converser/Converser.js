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
    flex: 1,
    flexDirection: 'column',
  },
  inputs: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputColumn: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: "3em",
    marginRight: "3em",
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
    marginBottom: "2em",
  },
  button: {
    flex: 1,
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

  const [nameFrom, setCurrencyFrom] = React.useState("");
  const [nameTo, setCurrencyTo] = React.useState("");
  const [valueFrom, setValueFrom] = React.useState(0);
  const [valueTo, setValueTo] = React.useState(0);
  const [currencies, setCurrencies] = React.useState([{ name: 'Bitcoin', code: 'BTC'}, { name: 'Ethereum', code: 'ETH'}]);

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

  const conversion = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/converser/convert',
      params: {
        from: nameFrom,
        to: nameTo,
        value: valueFrom,
      }
    })
    .then((response) => {
      setValueTo(response.data.value);
    });
  };

  const handleDropFrom = (event) => {
    setCurrencyFrom(event.target.value);
  };

  const handleDropTo = (event) => {
    setCurrencyTo(event.target.value);
  };

  const handleValueFrom = (event) => {
    if (parseFloat(event.target.value) < 0)
      event.target.value = parseFloat(event.target.value) + 1;
    setValueFrom(event.target.value);
  };

  return (
    <Container maxWidth="lg" className={classes.container} > {/* whole component */}
      <Grid container className={classes.inputs} item xs={12}> {/* inputs */}
        <Grid container className={classes.inputColumn} item xs={12} sm={12} md={5} lg={5}> {/* 'from' column */}
          <Grid className={classes.title} container justify="flex-start" >
            <p>From</p>
          </Grid>
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
        <Grid container className={classes.inputColumn} item xs={12} sm={12} md={5} lg={5}> {/* 'to' column */}
          <Grid className={classes.title} container justify="flex-start">
            <p>To</p>
          </Grid>
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
          <Grid className={classes.input} container>
            <ConversationRatio
              valueFrom={valueFrom}
              valueTo={valueTo}
              nameFrom={nameFrom}
              nameTo={nameTo}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}> {/* button */}
        <Grid className={classes.input} container justify="center">
          <Button className={classes.button} variant="contained" onClick={conversion}>
            Convert
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
