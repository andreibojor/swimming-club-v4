"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

const data = [
  { name: "Group A", value: 300 },
  { name: "Group B", value: 700 },
];
const COLORS = ["#00C49F", "#0088FE"];

export default function AttendancePieChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart width={800} height={200}>
        <Pie
          data={data}
          // cx={120}
          // cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
