/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { white, purple, black } from "../../styles/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: white,
    flexDirection: "row-reverse",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 0,
    marginBottom: "2em",
    padding: "10px 15px 10px 15px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "2 0 0%",
    margin: "auto 0",
    justifyContent: "center",
    fontSize: "14px",
  },
  url: {
    color: black,
    textDecoration: "none",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  readMore: {
    fontWeight: "bold",
    color: purple,
    userSelect: "none",
    cursor: "pointer",
  },
  line: {
    margin: "15px 0 8px 0",
    width: 200
  },
  tags: {
    display: "flex",
    justifyContent: "flex-start",
    listStyle: "none",
    padding: 0,
    flexWrap: 'wrap'
  },
  tag: {
    padding: 3,
    marginRight: 5,
    color: purple,
    border: "1px solid",
    borderColor: purple,
    fontSize: 12,
    marginTop: 3
  },
  media: {
    flex: "1 0 0%",
    maxWidth: 200,
    maxHeight: 200,
  },
}));

const NewsCard = (props) => {
  const [readMore, setReadMore] = useState(false);
  const classes = useStyles();
  const { url, title, content, extraContent, image, tags } = props;

  return (
    <Card className={classes.root}>
      <img className={classes.media} src={image} alt="News Source" />
      <CardContent className={classes.content}>
        <a href={url} className={classes.url}>
          <p className={classes.title}>{title}</p>
        </a>
        <p>
          {content}
          {""}
          {extraContent.length > 0 ? (readMore ? extraContent : " ...") : ""}
          {extraContent.length > 0 ? (
            <a
              className={classes.readMore}
              onClick={() => {
                setReadMore(!readMore);
              }}
            >
              {readMore ? " (read less)" : " (read more)"}
            </a>
          ) : (
            ""
          )}
        </p>
        <Divider className={classes.line} />
        <ul className={classes.tags}>
          {tags.map((element) => {
            return (
              <li key={element} className={classes.tag}>
                {element}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
