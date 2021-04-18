import React from 'react';
//@core-material-ui
import {makeStyles, Box } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


const data = {
    title: "Market cap",
    value: 997102302,
    up: true,
    percentage: 2.9
}

const useStyles = makeStyles({
  root: {
    minWidth: 175,
    maxWidth: 245,
    minHeight: 120,
    maxHeight: 220

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  colorGreen: {
    color:'#3AD083'
    }
});

export default function CardCoinInfo() {
  const classes = useStyles();
  return (
      <Box fontWeight={400} p = {2} boxShadow={1} className={classes.root}>
        <Box className={classes.title} color="textSecondary" >
            {data.title}
        </Box>
        <Box variant="h5" component="h2">
            {data.value.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
        </Box>
        <Box color="textSecondary" alignItems="center" display="flex"  py={0} fontSize={16} borderRadius={10} className= {classes.colorGreen}>
            <ArrowDropUpIcon></ArrowDropUpIcon>
            {data.percentage} %
        </Box>

      </Box>

  );
}