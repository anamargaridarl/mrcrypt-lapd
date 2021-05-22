import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import NewsCard from "./NewsCard";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "4em",
  },
  pagination: {
    margin: "0 auto 5em auto",
  },
}));

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categories = params.get("categories") || "";
    getNews(categories);
  }, [location.search, page]);

  const handleChange = (_, value) => {
    setPage(value);
  };

  const getNews = async (categories) => {
    try {
      const config = {
        method: "get",
        url: "http://localhost:8080/api/news/",
        params: {
          page: page,
        },
      };
      if (categories.length > 0)
        config.params = { ...config.params, categories };
      axios(config).then((response) => {
        setNews(response.data.data);
        setCount(response.data.count);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      {news.map((element) => {
        return (
          <Box>
            <NewsCard
              url={element.url}
              title={element.title}
              content={element.content}
              extraContent={element.extraContent}
              image={element.image}
              tags={element.tags}
            />
          </Box>
        );
      })}
      <Pagination
        className={classes.pagination}
        count={count}
        page={page}
        onChange={handleChange}
        shape="rounded"
      />
    </Box>
  );
};

export default NewsList;
