"use client";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PieChart = ({ label, quantity }) => {
  const data_pie = {
    labels: label,
    datasets: [
      {
        data: quantity,
        backgroundColor: ["red"],
      },
    ],
  };

  const bar_options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Trade Brokers",
      },
    },
  };
  return <Pie data={data_pie} options={bar_options}/>;
};

export default PieChart;
