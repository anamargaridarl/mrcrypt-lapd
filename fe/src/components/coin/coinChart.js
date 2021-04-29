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
const data = [
  {
    name: "2008",
    pv: 2400,
  },
  {
    name: "2010",
    pv: 1398,
  },
  {
    name: "2012",
    pv: 9800,
  },
  {
    name: "2014",
    pv: 3908,
  },
  {
    name: "2016",
    pv: 4800,
  },
  {
    name: "2018",
    pv: 3800,
  },
  {
    name: "2020",
    pv: 4300,
  },
];

export default function CoinChart({ name }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)} Charts</h2>
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
            widthContainer={"90%"}
            heightContainer={180}
            strokeColor={purple}
            dataAux={data}
          ></LineCharts>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper>
          <LineCharts
            widthContainer={"90%"}
            heightContainer={180}
            strokeColor={purple}
            dataAux={data}
          ></LineCharts>
        </Paper>
      </TabPanel>
    </>
  );
}
