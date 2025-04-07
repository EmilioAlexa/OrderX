import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  time: string;
  sales: number;
  revenue: number;
}


interface OverviewChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
  range: 'monthly' | 'weekly' | 'daily'; // <-- agregar esto
}


const OverviewChart: React.FC<OverviewChartProps> = ({
  data,
  color = "#C2A67D",
  height = 300,
  range, // <-- agrega esto aquí
}) => {

  // Formateamos los datos para usar abreviaturas de meses
  const formattedData = data.map((item) => {
  if (range === 'monthly') {
    const date = new Date(item.time);
    if (!isNaN(date.getTime())) {
      return {
        ...item,
        label: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      };
    }
  }

  // Si es daily o weekly, usar el valor original
  return {
    ...item,
    label: item.time,
  };
});

  
  

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} // Elimina líneas verticales del grid
            stroke="#eee" // Color más suave para el grid
          />
          <XAxis 
            dataKey="label" // Usamos la abreviatura del mes
            axisLine={false} // Elimina la línea del eje
            tickLine={false} // Elimina las marcas de tick
            tick={{ fill: '#666', fontSize: 12 }} // Estilo de los textos
            padding={{ left: 20, right: 20 }} // Espaciado
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
            tickCount={6} // Mostrar 6 ticks (5k, 4k, 3k, 2k, 1k, 0)
            domain={[0, 'dataMax + 1000']} // Ajuste del dominio
            tickFormatter={(value) => `${value / 1000}k`} // Formato 5k, 4k, etc.
          />
          <Tooltip 
            formatter={(value, name) => [`${value}`, name === "sales" ? "Sales" : "Revenue"]}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              background: '#2C2C2C',
              border: '1px solid #444',
              borderRadius: '6px',
              color: '#fff'
            }}
            labelStyle={{ color: '#ccc' }}
            itemStyle={{ color: '#fff' }}
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#B78628"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#B78628' }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#EDEDED"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#EDEDED' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;