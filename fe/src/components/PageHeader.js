import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {font_family, header_font_size, header_font_weight} from '../styles/fonts';
import {black} from '../styles/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: font_family,
    fontSize: header_font_size,
    fontWeight: header_font_weight,
    color: black,
    marginLeft: '4em',
    marginTop: '3em',
    marginBottom: '3em',
    textAlign: 'left',
  }
}));

export default function PageHeader(props) {
  const classes = useStyles();

  return (
    <>
      <p className={classes.root}>{props.name}</p>
    </>
  );
}