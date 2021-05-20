import React, { useState } from "react";
//@materialui-core
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

export default function SelectElement({
  listValues,
  actualElement,
  title,
  handleChangeParent,
}) {
  const [currentValue, setCurrentValue] = useState(actualElement);

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
    handleChangeParent(e.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> {title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentValue}
          onChange={handleChange}
        >
          {listValues.map((element) => {
            return <MenuItem key={element.id} value={element.name}> {element.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
