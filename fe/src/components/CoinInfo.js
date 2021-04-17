import React from 'react';
//@core-material-ui
import {makeStyles, Box, Container } from '@material-ui/core';



const useStyles = makeStyles((_) =>({
  maxwidth: {
    maxWidth: '600px'
  }
}));

// this data will need to be fetched from an api
const coinData = {
    name: 'Bitcoin',
    description: 'Bitcoin is a digital currency that was created in January 2009. It follows the ideas set out in a whitepaper by the mysterious and pseudonymous Satoshi Nakamoto The identity of the person or persons who created the technology is still a mystery. Bitcoin offers the promise of lower transaction fees than traditional online payment mechanisms and, unlike government-issued currencies, it is operated by a decentralized authority.',
    imagePath: "/assets/bitcoin.png",

}

export default function CoinInfo() {
  const classes = useStyles();

  return (
    <Box m ={1} p ={2} >
        <Box alignItems="center" display="flex">
            <Box  mx={1}>
                <img width={"30px"} alt={coinData.name} src={coinData.imagePath} />
            </Box>
            <Box>
            <h2 >{coinData.name}</h2>
            </Box>
        </Box>
        <Box m = {1} fontSize={13} className={classes.maxwidth}>
            {coinData.description}
        </Box>
    </Box>
  );
}