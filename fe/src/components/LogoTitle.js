import React from "react";
import { useHistory } from "react-router-dom";

//@styling
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  text: {
    padding: 0,
    color: "#ffffff",
  },
});

export default function LogoTitle({ name }) {
  const history = useHistory();
  const { text } = useStyles();

  return (
    <div
      onClick={() => {
        history.push("/");
      }}
    >
      <p className={text}>{name}</p>
    </div>
  );
}
