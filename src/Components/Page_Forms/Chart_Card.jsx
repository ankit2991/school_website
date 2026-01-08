import React from "react";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, 
  Bar, LineChart, Line, 
} from "recharts";

const Chart_Card = ({
  title = "Chart Title",
  color = "#2563eb", // default blue
  chartType = "area", // "area" | "bar" | "line"
  data = [],
  xKey = "x",
  yKey = "y",
  height = 250,
}) => {
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} />
          </LineChart>
        );
      default:
        // Area Chart
        return (
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={color}
              fillOpacity={1}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border overflow-hidden">
      <div
        className="text-white px-4 py-2 text-sm font-medium"
        style={{ backgroundColor: color }}
      >
        {title}
      </div>
      <div className="p-4" style={{ height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart_Card;
