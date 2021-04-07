import React from 'react';
//@core-material-ui
import { Card, Grid, MenuItem, makeStyles, TextField } from '@material-ui/core';
//@components
import Link from './Link'
//@styling
import {gray, black, dark_gray, white} from '../styles/colors'
import {font_family, header_font_size} from '../styles/fonts'

const useStyles = makeStyles((theme) =>({
  card_holder: {
    backgroundColor: gray,
    marginLeft: '4em',
    marginRight: '4em',
  },
  leftItems: {
    paddingLeft: '3em',
    paddingRight: '6em',
    paddingTop: '1em',
  },
  rightItems: {
    paddingLeft: '6em',
    paddingRight: '3em',
    paddingTop: '1em', 
  },
  title: {
    fontFamily: font_family,
    fontWeight: 1000,
    color: dark_gray,
    fontSize: header_font_size,
  },
  input: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  textFields: {
    "& .MuiInputBase-input": {
      backgroundColor: white,
    }
  }
}));

//TODO: call backend for available coins
const currencies = [
  {
    value: 'BTC',
    label: 'Bitcoin',
  },
  {
    value: 'ETC',
    label: 'Ethereum',
  },
  {
    value: 'DOGE',
    label: 'Dogecoin',
  },
  {
    value: 'ADA',
    label: 'Cardano',
  },
];

export default function Converser() {
  const classes = useStyles();

  const [currency, setCurrency] = React.useState('BTC');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Card className={classes.card_holder}>
      <Grid container justify="space-around">
        <Grid className={classes.leftItems} item xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.title}container justify="flex-start">
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
              placeholder="0" 
              variant="outlined">
            </TextField>
          </Grid>
        </Grid>
        <Grid className={classes.rightItems} item xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.input} container>
            <TextField
              className={classes.textFields}
              id="convert-to"
              type="number" 
              InputLabelProps={{ shrink: true }}
              placeholder="0" 
              variant="outlined">
            </TextField>
          </Grid>
        </Grid>
        <Grid className={classes.leftItems} item xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.input} container>
            <TextField
              className={classes.textFields}
              id="drop-from"
              select
              label="Currency"
              value={currency}
              onChange={handleChange}
              helperText="Please select your currency"
              variant="outlined"
              >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
              value={currency}
              onChange={handleChange}
              helperText="Please select your currency"
              variant="outlined"
              >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Link tColor={black} name={"CurrentRatio"} />
        </Grid>
        <Grid item sx={12} sm={12} md={12} lg={12}> 
          <Link tColor={black} name={"ConvertButton"} />
        </Grid>
      </Grid>
    </Card>
  );
}