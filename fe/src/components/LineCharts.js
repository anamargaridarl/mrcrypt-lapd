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


const normalize = (data) => {
  let min = Infinity, max = -1;
  data.forEach(element => {
    if (element.pv != null) {
      min = Math.min(min, element.pv)
      max = Math.max(max, element.pv)
    }
  });

  const thresh = 100000;

  if (max < 100000) {
    return 1;
  }

  const order = Math.floor(Math.log(max) / Math.LN10 + 0.000000001);
  const magnitude = Math.pow(10, order) / thresh;

  for (let i = 0; i < data.length; i++) {
    if (data[i] != null) {
      data[i].pv /= magnitude;
    }
  }
  return magnitude;


}

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

  const units = normalize(dataAux)




  return (
    <ResponsiveContainer width={widthContainer} height={heightContainer}>
      <LineChart data={dataAux}>
        <Line
          className={chart}
          type="monotone"
          dot={false}
          dataKey="pv"
          strokeWidth={2}
          unit={ units === 1 ? '' : `* 10^ ${Math.log10(units)}`}
        />
        <YAxis type="number" tick={{ fontSize: 14, width: 300 }} />
        <XAxis dataKey="name" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
