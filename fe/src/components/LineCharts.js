import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
//@core-material-ui
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  chart: {
    "& path.recharts-curve": {
      stroke: (props) => props.strokeColor,
    },
  },
});

export default function LineCharts({
  widthContainer,
  heightContainer,
  strokeColor,
  dataAux,
}) {
  const props = {
    strokeColor: strokeColor,
  };
  const { chart } = useStyles(props);

  return (
    <ResponsiveContainer width={widthContainer} height={heightContainer}>
      <LineChart width={300} height={100} data={dataAux}>
        <Line
          className={chart}
          type="monotone"
          dot={false}
          dataKey="pv"
          strokeWidth={2}
        />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
