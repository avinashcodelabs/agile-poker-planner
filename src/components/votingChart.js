import { COLORS } from "@/lib/getRandomColor";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const SIZE = 110;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 shadow-lg rounded-lg">
        <p>{`Point: ${payload[0].name}`}</p>
        <p className="font-bold">{`Votes: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const VotingChart = ({ data }) => {
  return (
    <PieChart width={SIZE} height={SIZE}>
      <Pie
        dataKey="count"
        data={data}
        nameKey="point"
        cx="50%"
        cy="50%"
        outerRadius={SIZE / 2}
        innerRadius={SIZE / 6}
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          count,
          point,
        }) => {
          const RADIAN = Math.PI / 180;
          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
          const x = cx + radius * Math.cos(-midAngle * RADIAN) - 11;
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
          return (
            <text
              x={x}
              y={y}
              fill="black"
              dominantBaseline="central"
              className="text-xs font-semibold text-gray-400"
            >
              {`${point}(${value})`}
            </text>
          );
        }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
};

export default VotingChart;
