import React from "react";
//@materialui-core
import Avatar from "@material-ui/core/Avatar";
import { Grid, makeStyles, Paper } from "@material-ui/core";
//@stylying
import { purple, white } from "../../styles/colors";

const useStyles = makeStyles((theme) => ({
  iconRank: {
    color: white,
    backgroundColor: purple,
  },
  rightRankSide: {
    justifySelf: "flex-end",
    fontSize: "0.75em",
  },
  paper: {
    width: "20em",
    margin: "1em",
    padding: "0.5em",
    justifyContent: "center",
  },
}));

export default function SocialCarouselItem({ data }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {" "}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container justify="space-between">
            <Avatar className={classes.iconRank}>#1</Avatar>

            <p> Documenting Bitcoin</p>

            <img alt="Coin" width={"50px"} src={"./assets/bitcoin.png"} />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-between">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <p> WEIGHTED AVG RANK</p>
            <b> 59 </b>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <p className={classes.rightRankSide}>
              {" "}
              <b> 59 </b> WEIGHTED AVG RANK
            </p>

            <p className={classes.rightRankSide}>
              {" "}
              <b> 59 </b> WEIGHTED AVG RANK
            </p>
            <p className={classes.rightRankSide}>
              {" "}
              <b> 59 </b> WEIGHTED AVG RANK
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
