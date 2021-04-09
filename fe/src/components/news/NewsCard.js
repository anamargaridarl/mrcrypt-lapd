/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import { gray, dark_gray, white, purple } from "../../styles/colors";
import { font_family } from "../../styles/fonts";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: white,
    padding: "1em",
    flexDirection: "row-reverse",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "2 0 0%",
    margin: "auto 0",
    justifyContent: "flex-start",
    fontFamily: font_family,
    fontSize: "11px",
  },
  title: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  readMore: {
    fontWeight: "bold",
    color: purple,
  },
  line: {
    margin: "15px 0 8px 0",
    width: 200,
  },
  tags: {
    display: "flex",
    justifyContent: "flex-start",
  },
  tag: {
    padding: 3,
    marginRight: 5,
    color: purple,
    border: "1px solid",
    borderColor: purple,
  },
  media: {
    flex: "1 0 200",
    width: 200,
  },
}));

const news = {
  title: "Buying a Tesla With Bitcoin Exposes This Flaw, Don’t Get Caught Out",
  content:
    "In February, electric car maker Tesla announced it had purchased $1.5bn in Bitcoin",
  extraContent:
    "In February, electric car maker Tesla announced it had purchased $1.5bn in Bitcoin In February, electric car maker Tesla announced it had purchased $1.5bn in Bitcoin In February, electric car maker Tesla",
  image: "logo512.png",
  tags: ["BTC", "Market"],
};

const NewsCard = () => {
  const [readMore, setReadMore] = useState(false);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={news.image} />

      <CardContent className={classes.content}>
        <p className={classes.title}>{news.title}</p>
        <p>
          {news.content} {readMore ? news.extraContent : " ..."}{" "}
          <a
            className={classes.readMore}
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            {readMore ? "(read less)" : "(read more)"}
          </a>
        </p>
        <Divider className={classes.line} />
        <div className={classes.tags}>
          {news.tags.map((element) => {
            return <p className={classes.tag}>{element}</p>;
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
