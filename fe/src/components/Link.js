import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { purple } from "../styles/colors";

const useStyles = makeStyles((theme) => ({
  //   text: {
  //     "&:hover": {
  //       fontWeight: "bold",
  //     },
  //   },
}));

export default function Link({ url, name, tColor }) {
  const classes = useStyles();
  const history = useHistory();
  const [textColor, setTextColor] = useState(tColor);
  const [fontWeight, setFontWeight] = useState("normal");

  useEffect(() => {
    getColor();
  }, [window.location.href]);

  const getColor = () => {
    console.log(window.location.href);
    let url = window.location.href;

    if (url.includes(name.toLowerCase())) {
      setTextColor(purple);
      setFontWeight("bold");
    } else {
      setTextColor(tColor);
      setFontWeight("normal");
    }
  };

  return (
    <div
      className={classes.text}
      onClick={() => {
        history.push("/");
      }}
    >
      <p style={{ color: textColor, fontWeight: fontWeight, padding: 0 }}>
        {name}
      </p>
    </div>
  );
}
