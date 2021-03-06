import React from "react";
//@core-material-ui
import { makeStyles, Container } from "@material-ui/core";
// @styling
import { gray, purple } from '../styles/colors'

const useStyles = makeStyles((_) => ({
  footer: {
    backgroundColor: gray,
    fontWeight: 'bold',
    color: purple,
    fontSize: 12,
    maxWidth: "inherit",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 999,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Container className={classes.footer}  maxWidth={false}>
      <p>@mrcrypt</p>
    </Container>
  );
}
