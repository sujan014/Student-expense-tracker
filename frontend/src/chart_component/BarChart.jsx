import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData, chartName }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: chartName
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

