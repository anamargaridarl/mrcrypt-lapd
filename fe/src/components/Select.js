import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from "@material-ui/core/MenuItem";
//@stylying
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    padding: "0.5em 3.5em",
  },
  formControl: {
    margin: "0.5em",
    minWidth: "20em",
  },
});

export default function SelectElement({
  listValues,
  actualElement,
  title,
  handleChangeParent,
}) {
    const classes = useStyles();

  const [values] = useState(listValues);
  const [currentValue, setCurrentValue] = useState(actualElement);

  const handleChange = (e) => {
    setCurrentValue(e.value);
    handleChangeParent(e.value);
  };

  return (
    <div>
         <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label"> {title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentValue}
        onChange={handleChange}
      >
        {values.map((element) => {
          return <MenuItem value={element.id}> {element.name}</MenuItem>;
        })}
      </Select>
      </FormControl>
    </div>
  );
}
