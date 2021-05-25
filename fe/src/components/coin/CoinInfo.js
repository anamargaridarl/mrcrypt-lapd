import React from "react";
//@core-material-ui
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
//@styling
import { lighterGray } from "../../styles/colors";
import Loading from '../../components/Loading';



const useStyles = makeStyles({
  container: {
    paddingBottom: "0.5em",
    borderBottom: "1px solid " + lighterGray,
  },
});

const linkfy = (text) => {
  let urlRegex =/(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;


  let strin = [];
  let lastChar = 0;
  let match;
  let nr = 0;
  while ((match = urlRegex.exec(text)) != null) {
    strin.push(<span key= {nr++}>{text.substring(lastChar, match.index)}</span>)
    const val = text.substring(match.index, match[0].length + match.index);
    const link = <a rel="noreferrer" target="_blank" key= {nr++} href={val}>{val}</a>;
    strin.push(link);
    lastChar  = (match[0].length + match.index);
  }

  strin.push(<span key = {nr++}>{text.substring(lastChar, text.length)}</span>);

  console.log(strin)
  return <span>{strin}</span>
}

export default function CoinInfo(props) {
  const { container } = useStyles();

  const data = props.data;

  if (props === null || !props.data) {
    return (
      <Loading/>
    );
  }
  else {
    return ( 
    <Grid container className={container}>
      <img width={"60px"} alt={data.name} src={data.logo} />
      <h2 style={{ marginLeft: "2em" }}>{data.name}</h2>
      <p> {linkfy(data.description)}</p>
  </Grid>);
  }


}
