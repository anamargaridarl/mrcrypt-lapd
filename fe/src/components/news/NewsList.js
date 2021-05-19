import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import NewsCard from "./NewsCard";
import axios from "axios";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categories = params.get("categories") || "";
    getNews(categories);
  }, [location.search]);

  const getNews = async (categories) => {
    try {
      const config = {
        method: "get",
        url: "http://localhost:8080/api/news/",
      };
      if (categories.length > 0) config.params = { categories };
      axios(config).then((response) => {
        setNews(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" flexDirection="column">
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
    </Box>
  );
};

export default NewsList;
