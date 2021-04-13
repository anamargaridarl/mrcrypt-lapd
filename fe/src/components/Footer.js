import React from 'react';
//@core-material-ui
import { makeStyles, Container } from '@material-ui/core';
// @styling
import { font_family } from '../styles/fonts'
import { gray, purple } from '../styles/colors'


const useStyles = makeStyles((_) =>({
  footer: {
    backgroundColor: gray,
    fontFamily: font_family,
    fontWeight: 'bold',
    color: purple,
    fontSize: 12,
    maxWidth: 'inherit',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 999
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Container className={classes.footer}>
      <p>@mrcrypt</p>
    </Container>
  );
};
