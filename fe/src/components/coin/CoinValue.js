import React from 'react';
//@core-material-ui
import {makeStyles, Box} from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';



const useStyles = makeStyles((_) =>({
  buttonPercentage: {
    background: '#3AD083',
    color: '#fff',
    border: "50%"
  },
  colorGreen: {
      color:'#3AD083'
  }
}));

// this data will need to be fetched from an api
const coinData = {
    name: 'Bitcoin',
    abreviation: 'BTC',
    price: 53418.76,
    percentage: 2.90,
    up: true,
    eth: 32.53,
    ethPercentage: 2.9
}

export default function CoinInfo() {
  const classes = useStyles();

  return (
      <Box m ={1} >
        <Box  mx ={3} my = {1} display="flex" justifyContent="flex-end" fontSize={13} color="text.secondary">{coinData.name} ({coinData.abreviation})</Box>
        <Box alignItems="center" display="flex">
            <Box  mx= {2}>
                <h1>{coinData.price.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</h1>
            </Box>
            <Box display="flex" alignItems="center" px={1} py={0} fontSize={7} borderRadius={10} className= {classes.buttonPercentage}>
                <ArrowDropUpIcon></ArrowDropUpIcon>
                <h2 >{coinData.percentage}%</h2>
            </Box>
        </Box>
        <Box mx ={3} mt={1} justifyContent="flex-end" alignItems="center" display="flex">
            <Box fontSize={7} color="text.secondary" mx= {2}>
                <h2 >{coinData.eth} ETH</h2>
            </Box>
            <Box  alignItems="center" display="flex" px={2} py={0} fontSize={7} borderRadius={10} className= {classes.colorGreen}>
                <ArrowDropUpIcon></ArrowDropUpIcon>
                <h2 >{coinData.ethPercentage} %</h2>
            </Box>
        </Box>
    </Box>
  );
}