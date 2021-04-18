import React from "react";
import Box from "@material-ui/core/Box";
import NewsCard from "./NewsCard";

const news = [
  {
    title:
      "Buying a Tesla With Bitcoin Exposes This Flaw, Don’t Get Caught Out",
    content:
      "In February, electric car maker Tesla announced it had purchased $1.5bn in Bitcoin",
    extraContent:
      "In February, electric car maker Tesla announced it had purchased $1.5bn in Bitcoin In February, electric car maker Tesla announced it had purchased $1.5bn in Bitcoin In February, electric car maker Tesla",
    image:
      "https://media-exp1.licdn.com/dms/image/C4E0BAQGOdQgTxQ4FOw/company-logo_200_200/0/1523982168898?e=2159024400&v=beta&t=-grmd0_xBIiVJOYHyOP0v4E8mqdr8Atz-wRd8ym8Ngw",
    tags: ["BTC", "Market"],
  },
  {
    title:
      "Buying a Tesla With Bitcoin Exposes This Flaw, Don’t Get Caught Out",
    content:
      "In February, electric car maker Tesla announced it had purchased $1.5bn in Bitcoin",
    extraContent:
      "In February, electric car maker Tesla announced it had purchased $1.5bn in Bitcoin In February, electric car maker Tesla announced it had purchased $1.5bn in Bitcoin In February, electric car maker Tesla",
    image:
      "https://media-exp1.licdn.com/dms/image/C4E0BAQGOdQgTxQ4FOw/company-logo_200_200/0/1523982168898?e=2159024400&v=beta&t=-grmd0_xBIiVJOYHyOP0v4E8mqdr8Atz-wRd8ym8Ngw",
    tags: ["Market"],
  },
];

const NewsList = (props) => {
  const { filter } = props;

  return (
    <Box display="flex" justifyContent="space-between" flexDirection="column">
      {news
        .filter((element) => {
          let checker = (arr, target) => target.some((v) => arr.includes(v));
          return filter.length === 0 || checker(filter, element.tags);
        })
        .map((element) => {
          return (
            <Box>
              <NewsCard
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
