import React from "react";
//@core-material-ui
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
//@styling
import { lighterGray } from "../../styles/colors";

// this data will need to be fetched from an api
const coinData = {
  name: "Bitcoin",
  description:
    "Bitcoin is a digital currency that was created in January 2009. It follows the ideas set out in a whitepaper by the mysterious and pseudonymous Satoshi Nakamoto The identity of the person or persons who created the technology is still a mystery. Bitcoin offers the promise of lower transaction fees than traditional online payment mechanisms and, unlike government-issued currencies, it is operated by a decentralized authority.",
  imagePath: "/assets/bitcoin.png",
};

const useStyles = makeStyles({
  container: {
    paddingBottom: "0.5em",
    borderBottom: "1px solid " + lighterGray,
  },
});

export default function CoinInfo(props) {
  const { container } = useStyles();
  console.log(props);

  const data = props.data;

  if (props === null || !props.data) {
    return (
      <div>Loading...</div>

    );
  }
  else {
    return ( <Grid container className={container}>
      <img width={"60px"} alt={data.name} src={data.logo} />
      <h2 style={{ marginLeft: "2em" }}>{data.name}</h2>
      <p> {data.description}</p>
  </Grid>);
  }


}
