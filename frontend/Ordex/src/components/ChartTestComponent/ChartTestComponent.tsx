// src/components/ChartTestComponent/ChartTestComponent.tsx
import React from "react";
import OverviewChart from "../OverviewChart/OverviewChart";

const data = [
  { time: "2024-01-01", value: 50 },
  { time: "2024-01-02", value: 55 },
  { time: "2024-01-03", value: 53 },
  { time: "2024-01-04", value: 58 },
];

const ChartTestComponent: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Mi gráfica con Recharts</h2>
      <OverviewChart data={data} />
    </div>
  );
};

export default ChartTestComponent;
  