import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import LineCharts from "../LineCharts";
//@styling
import { purple } from "../../styles/colors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({}));


export default function CoinChart({ name, data }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const price = [];
  const marketPrice = [];

  data.forEach(element => {
    price.push({name: element.time, pv: element.open});
    marketPrice.push({name: element.time, pv: element.market_cap})
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (price.length === 0 && marketPrice.length === 0) {
    return <div>Loading charts....</div>
  }

  return (
    <>
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)} Charts (last year)</h2>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Price" {...a11yProps(0)} />
          <Tab label="Market Cap" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Paper>
          <LineCharts
            widthContainer={"100%"}
            heightContainer={180}
            strokeColor={purple}
            dataAux={price}
          ></LineCharts>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper>
          <LineCharts
            widthContainer={"100%"}
            heightContainer={180}
            strokeColor={purple}
            dataAux={marketPrice}
          ></LineCharts>
        </Paper>
      </TabPanel>
    </>
  );
}
