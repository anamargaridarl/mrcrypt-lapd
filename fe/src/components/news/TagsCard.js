/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { gray, darkGray, white, purple } from "../../styles/colors";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: gray,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 0,
    marginRight: "4em",
  },
  content: {
    margin: "auto 0",
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
    userSelect: "none",
    cursor: "pointer",
  },
  purpleTag: {
    background: purple,
    color: white,
  },
  normalTag: {
    background: white,
    color: darkGray,
  },
}));

const TagsCard = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categories = params.get("categories");
    if (categories && categories.length > 0) setFilter(categories.split(","));
    getCategories();
  }, [location.search]);

  const getCategories = async () => {
    try {
      axios({
        method: "get",
        url: "http://localhost:8080/api/news/categories",
      }).then((response) => {
        setCategories(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (category) => {
    let index = filter.indexOf(category);
    let arr = [...filter];
    index === -1 ? arr.push(category) : arr.splice(index, 1);
    setFilter(arr);
    const config = { pathname: "news" };
    if (arr.length > 0) config.search = `?categories=${arr.join(",")}`;
    history.push(config);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <p>Categories</p>
        <Divider variant="middle" className={classes.line} />
        <ul className={classes.tags}>
          {categories.map((element) => {
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
