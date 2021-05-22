import React from "react";
//@core-material-ui
import { makeStyles, Box } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { darkGray, lightGreen, red } from "../../styles/colors";

const useStyles = makeStyles({
  root: {
    minWidth: 175,
    maxWidth: 245,
    minHeight: 120,
    maxHeight: 220,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    color: darkGray,
    fontSize: 14,
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 12,
  },
  colorGreen: {
    color: lightGreen,
  },
  colorRed: {
    color: red
  }
});

export default function CardCoinInfo({data}) {
  const classes = useStyles();

  console.log(data)

  if (data.data === null) {
    return <div>Loading {data.title}...</div>
  }

  const percentage = data.data[data.symbol].percentage;

  let icon = percentage >= 0 ? <ArrowDropUpIcon></ArrowDropUpIcon> : <ArrowDropDownIcon></ArrowDropDownIcon>;

  return (
    <Box fontWeight={400} p={2} className={classes.root}>
      <Box className={classes.title} color="textSecondary">
        {data.title}
      </Box>
      <Box variant="h5" component="h2">
        {data.data[data.symbol].value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </Box>
      <Box
        color="textSecondary"
        alignItems="center"
        display="flex"
        py={0}
        fontSize={16}
        borderRadius={10}
        className={ percentage >=0 ? classes.colorGreen : classes.colorRed}
      >
        {icon}
        {percentage} %
      </Box>
    </Box>
  );
}
