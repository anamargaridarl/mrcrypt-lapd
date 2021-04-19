import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//@core-material-ui
import { makeStyles } from "@material-ui/core/styles";
//@styling
import { purple } from "../styles/colors";

const useStyles = makeStyles({
  text: {
    padding: 0,
    color: (props) => props.textColor,
    fontWeight: (props) => props.fontWeight,
    "&:hover": {
      fontWeight: "bold",
    },
  },
});

export default function Link({ url, name, tColor }) {
  const history = useHistory();
  const [textColor, setTextColor] = useState(tColor);
  const [fontWeight, setFontWeight] = useState("normal");
  let props = {
    fontWeight: fontWeight,
    textColor: textColor,
  };
  const { text } = useStyles(props);

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
      onClick={() => {
        if (name.toLowerCase() === "mrcrypt") history.push("/");
        else if (name.toLowerCase() === "social media trends") history.push("/socialmedia");
        else history.push("/" + name.toLowerCase());
      }}
    >
      <p className={text}>{name}</p>
    </div>
  );
}
