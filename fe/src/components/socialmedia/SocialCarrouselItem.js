import React from "react";
//@materialui-core
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { Grid, makeStyles, Paper } from "@material-ui/core";
//@styling
import { purple, white, darkGray } from "../../styles/colors";

const useStyles = makeStyles((theme) => ({
  iconRank: {
    color: white,
    backgroundColor: purple,
    fontSize: 12,
    marginRight: 12,
  },
  rightRankSide: {
    justifySelf: "flex-end",
    fontSize: "0.75em",
  },
  paper: {
    width: "17.5em",
    margin: "1em",
    padding: "1em",
    justifyContent: "center",
  },
  columns: {
    color: darkGray,
  },
  influencerImage: {
    border: "3px solid",
    borderColor: purple,
    float: "right",
  },
  line: {
    margin: "15px auto",
    width: "15em",
  },
  lineVertical: {
    height: "6em",
  },
  left: {
    margin: "0 auto",
    fontSize: 14,
  },
}));

export default function SocialCarouselItem({ data }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid container alignItems="center" xs={8}>
            <Avatar className={classes.iconRank}>@</Avatar>
            <p> {data.title}</p>
          </Grid>
          <Grid item xs={4}>
            <img
              className={classes.influencerImage}
              alt="Coin"
              width={"50px"}
              src={data.imageSrc}
            />
          </Grid>
        </Grid>
        <Divider className={classes.line} />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item className={classes.columns}>
            <p className={classes.left}>WEIGHTED AVG RANK</p>
            <b className={classes.left}>{data.weightedRank}</b>
          </Grid>
          <Divider orientation="vertical" className={classes.lineVertical} />
          <Grid item className={classes.columns}>
            <p className={classes.rightRankSide}>
              <b> {data.engagementRank} </b> ENGAGEMENT RANK
            </p>
            <p className={classes.rightRankSide}>
              <b> {data.followerRank} </b> FOLLOWER RANK
            </p>
            <p className={classes.rightRankSide}>
              <b> {data.postRank}</b> POST RANK
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
