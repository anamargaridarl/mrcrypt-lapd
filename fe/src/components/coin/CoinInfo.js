import React from "react";
//@core-material-ui
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
//@styling
import { lighterGray } from "../../styles/colors";


const useStyles = makeStyles({
  container: {
    paddingBottom: "0.5em",
    borderBottom: "1px solid " + lighterGray,
  },
});

export default function CoinInfo(props) {
  const { container } = useStyles();

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
