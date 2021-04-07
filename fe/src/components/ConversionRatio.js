import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';

//@styling
import { green, red } from '../styles/colors'
import { font_family } from '../styles/fonts'

const useStyles = makeStyles((_) =>({
  ratioField: {
    textAlign: 'left',
    fontFamily: font_family,
    paddingRight: '2em',
  },
  gain: {
    color: green,
  },
  cost: {
    color: red
  },
  ratioSpacing: {
    paddingRight: '1em',
    "& p": {
      marginBottom: '0em'
    }
  },
}));


export default function ConversationRatio({valueFrom, nameFrom, valueTo, nameTo}) {
  const classes = useStyles();

  return (
    <div className={classes.ratioField}>
      <Grid container justify="flex-end">
        <Grid item className={classes.ratioSpacing}>
          <p>Sell {valueFrom} <b>{nameFrom}</b></p>
        </Grid>
        <Grid item className={classes.ratioSpacing}>
          <p>→</p>
        </Grid>
        <Grid item className={classes.ratioSpacing}>
          <p className={classes.gain}>Earn {valueTo} <b>{nameTo}</b></p>
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <Grid item className={classes.ratioSpacing}>
          <p>Buy {valueFrom} <b>{nameFrom}</b></p>
        </Grid>
        <Grid item className={classes.ratioSpacing}>
          <p>→</p>
        </Grid>
        <Grid item className={classes.ratioSpacing}>
          <p className={classes.cost}>Pay {valueTo} <b>{nameTo}</b></p>
        </Grid>
      </Grid>
    </div>
  );
}