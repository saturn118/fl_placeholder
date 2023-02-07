import React from "react";
import { Cell, Label, Legend, Pie, PieChart } from "recharts";

const data = [
  { name: "Agree", value: 5 },
  { name: "Against", value: 9 }
];
// const COLORS = ["#0088FE", "#00C49F"];
const COLORS = ["#B4B4B4", "#1976D2"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieComponent = ({
  customData = null,
  label = null,
  label2 = null,
  showLegend = false
}) => {
  let finalData = !!customData ? customData : data;

  return (
    <div className="bg-indigo-50">
      <PieChart width={400} height={85}>
        <Pie
          dataKey="value"
          startAngle={0}
          endAngle={180}
          data={finalData}
          labelLine={false}
          cx="50%"
          cy="100%"
          // outerRadius={50}
          fill="#8884d8"
          // label={renderCustomizedLabel}
          legendType={"circle"}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
        >
          <text x={0} y={0} fill="black" textAnchor="middle">
            {"Cheese"}
          </text>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label value="Pages of my website" offset={90} position="outside" />
        </Pie>

        {showLegend && (
          <Legend verticalAlign="top" align="center" height={36} />
        )}
      </PieChart>
      <p className="text-center font-bold">{label}</p>
      <p className="text-center">{label2}</p>
    </div>
  );
};

export default PieComponent;
