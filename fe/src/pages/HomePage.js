import React from "react";

//@components
import HomeCarousel from "../components/HomeCarousel";
import TopBar from "../components/TopBar";

//@stylying
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    margin: "1em 3.5em",
  },
});

export default function HomePage() {
  const { title } = useStyles();

  return (
    <div>
      <TopBar></TopBar>
      <HomeCarousel></HomeCarousel>
      <p className={title}>
        {" "}
        <b>Market</b>{" "}
      </p>
    </div>
  );
}
