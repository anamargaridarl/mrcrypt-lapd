import React from "react";
//@core-material-ui
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

//@components
import Link from "./Link";
import LogoTitle from "./LogoTitle";

//@stylying
import { makeStyles } from "@material-ui/core/styles";
import { purple, white, black } from "../styles/colors";

const useStyles = makeStyles((theme) => ({
  back: {
    backgroundColor: "#F5F5F5",
  },
  spacing: {
    margin: "1em",
  },
  logo: {
    marginLeft: "2.5em",
    textAlign: "center",
    width: "6em",
    padding: "1em",
    backgroundColor: purple,
    color: "#fffff",
  },
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <div>
      <Grid className={classes.back} container justify="space-around">
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid container>
            <Paper square className={classes.logo} elevation={0}>
              <LogoTitle tColor={white} name={"MRCRYPT"} />
            </Paper>
          </Grid>
        </Grid>
        <Grid className={classes.spacing} item xs={12} sm={6} md={6} lg={1}>
          <Link tColor={black} name={"Home"} />
        </Grid>
        <Grid className={classes.spacing} item xs={12} sm={6} md={6} lg={1}>
          <Link tColor={black} name={"News"} />
        </Grid>
        <Grid className={classes.spacing} item xs={12} sm={6} md={6} lg={1}>
          <Link tColor={black} name={"Converser"} />
        </Grid>
        <Grid className={classes.spacing} item xs={12} sm={6} md={6} lg={1}>
          <Link tColor={black} name={"Social Media Trends"} />
        </Grid>
      </Grid>
    </div>
  );
}
