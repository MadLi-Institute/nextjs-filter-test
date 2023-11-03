"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({data}) => {
  const data_bar = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "# of Stocks",
        data: Object.values(data),
        backgroundColor: ["red"],
      },
    ],
  };

  const bar_options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legends: {
        position: "right",
      },
      title: {
        display: true,
        text: "Stock Symbols",
      },
    },
  };

  return <Bar data={data_bar} options={bar_options} />;
};

export default BarChart;
