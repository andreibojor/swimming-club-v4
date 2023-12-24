"use client";

import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#00C49F", "#0088FE"];

export default function AttendancePieChart({ attendancesLeft }) {
  const data = [
    { name: "Group A", value: attendancesLeft },
    { name: "Group B", value: 8 },
  ];

  return (
    <ResponsiveContainer width={200} height={200}>
      <PieChart width={190} height={190}>
        <Pie
          data={data}
          // cx={120}
          // cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          startAngle={360}
          endAngle={0}
          stroke="none"
        >
          <Label
            value={`${attendancesLeft}`}
            position="centerBottom"
            className="label-top"
            fontSize="27px"
          />
          <Label value="sessions left" position="centerTop" className="label" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
