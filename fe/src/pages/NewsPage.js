import React, { useState } from "react";
import NewsList from "../components/news/NewsList";
import TagsCard from "../components/news/TagsCard";
import PageHeader from "../components/PageHeader";
import TopBar from "../components/TopBar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const NewsPage = () => {
  const [filter, setFilter] = useState([]);

  const changeFilter = (tag) => {
    let index = filter.indexOf(tag);
    let arr = [...filter];
    index === -1 ? arr.push(tag) : arr.splice(index, 1);
    setFilter(arr);
  };

  return (
    <div>
      <TopBar></TopBar>
      <PageHeader name="News"></PageHeader>
      <Grid container spacing={3}>
        <Grid item lg={8} md={6} xs={12}>
          <NewsList filter={filter} />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TagsCard filter={filter} onChange={changeFilter}></TagsCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewsPage;
