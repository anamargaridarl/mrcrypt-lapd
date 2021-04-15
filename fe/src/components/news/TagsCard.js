/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import { gray, dark_gray, white, purple } from "../../styles/colors";
import { font_family } from "../../styles/fonts";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: gray,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 0,
  },
  content: {
    margin: "auto 0",
    fontFamily: font_family,
    fontSize: 12,
    fontWeight: "bold",
  },
  line: {
    margin: "15px 0 15px 0",
    backgroundColor: white,
  },
  tags: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 0,
    fontWeight: "normal",
  },
  tag: {
    padding: "3px 15px",
    marginRight: 15,
    marginBottom: 15,
    border: "1px solid #DDDDDD",
    fontSize: 12,
    fontFamily: font_family,
    userSelect: "none",
    cursor: "pointer",
  },
  purpleTag: {
    background: purple,
    color: white,
  },
  normalTag: {
    background: white,
    color: dark_gray,
  },
}));

const tags = ["BTC", "Market", "ADA", "AltCoin", "BlockChain", "ETH"];

const TagsCard = (props) => {
  const { filter, onChange } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <p>Categories</p>
        <Divider variant="middle" className={classes.line} />
        <ul className={classes.tags}>
          {tags.map((element) => {
            return (
              <li
                key={element}
                className={`${classes.tag} ${
                  filter.includes(element)
                    ? classes.purpleTag
                    : classes.normalTag
                }`}
                onClick={() => onChange(element)}
              >
                {element}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TagsCard;
