import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend,
  } from '@devexpress/dx-react-chart-material-ui';
  import { Animation } from '@devexpress/dx-react-chart';
  import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';


  const format = () => tick => tick;
  const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
    },
  });
  const legendLabelStyles = theme => ({
    label: {
      paddingTop: theme.spacing(1),
      whiteSpace: 'nowrap',
    },
  });
  const legendItemStyles = () => ({
    item: {
      flexDirection: 'column',
    },
  });
  
  const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
  );
  const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
  );
  const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
  );
  const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
  const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
  const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);


  const ValueLabel = (props) => {
    const { text } = props;
    return (
      <ValueAxis.Label
        {...props}
        text={`$${text}`}
      />
    );
  };
  
  const titleStyles = {
    title: {
      whiteSpace: 'pre',
    },
  };
  const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
    <Title.Text {...props} className={classes.title} />
  ));

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
          <Typography>{children}</Typography>
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CoinChart() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = {
      name: "Bitcoin"
  }

  const chartData =[
    {
      year: 1993, bitcoinPrice: 15000,
    }, {
      year: 1995, bitcoinPrice: 19000,

    }, {
      year: 1997, bitcoinPrice: 19000,
    }, {
      year: 1999, bitcoinPrice: 19000,
    }, {
      year: 2001,bitcoinPrice: 19000,
    }, {
      year: 2003, bitcoinPrice: 19000,
    }, {
      year: 2006,bitcoinPrice: 25000,
    }, {
      year: 2008,bitcoinPrice: 19000,
    }, {
      year: 2010, bitcoinPrice: 19000,
    }, {
      year: 2012,bitcoinPrice: 19000,
    }, {
      year: 2014, bitcoinPrice: 30000,
    }, {
      year: 2016,bitcoinPrice: 35000,
    }, {
      year: 2018, bitcoinPrice: 45000,
    },
  ];

  return (
    <Box m = {1}  className={classes.root}>
        <h2>{data.name} charts</h2>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Price" {...a11yProps(0)} />
          <Tab label="Market Cap" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Paper>
        <Chart 
          data={chartData}
          className={classes.chart}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis
            max={50000}
            labelComponent={ValueLabel}
          />

          <LineSeries
            name="BITCOIN price"
            valueField="bitcoinPrice"
            argumentField="year"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Bitcoin price evolution`}
            textComponent={TitleText}
          />
          <Animation />
        </Chart>
      </Paper>
    
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Paper>
        <Chart 
          data={chartData}
          className={classes.chart}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis
            max={50000}
            labelComponent={ValueLabel}
          />

          <LineSeries
            name="BITCOIN market cap"
            valueField="bitcoinPrice"
            argumentField="year"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Bitcoin market cap`}
            textComponent={TitleText}
          />
          <Animation />
        </Chart>
      </Paper>
      </TabPanel>

    </Box>
  );
}