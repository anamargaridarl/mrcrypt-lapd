import React, { useState } from "react";
import Select from "../Select";
import Paper from "@material-ui/core/Paper";

//@stylying
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  select: {
    minWidth: "10em",
  },
  title: {
    margin: "1em",
    paddingTop:"1em",
    fontWeight: "bold",
  },
});

const list = [
  { id: 1, name: "bitcoin" },
  { id: 2, name: "titcoin" },
  { id: 3, name: "xitcoin" },
  { id: 4, name: "mitcoin" },
];
export default function GoogleCharts() {
  const [coin, setCoin] = useState("bitcoin");
  const { title, select } = useStyles();

  const handleCoin = (e) => {
    setCoin(e);
  };

  return (
    <div>
      <Paper>
        <p className={title}>Interest Time Evolution</p>
        <Select
          className={select}
          handleChangeParent={handleCoin}
          listValues={list}
          actualElement={coin}
          title={"Coin"}
        ></Select>
      </Paper>
    </div>
  );
}
