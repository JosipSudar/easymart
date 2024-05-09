import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale } from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(Bar);

const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Orders by month",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: false,
          text: "Months",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Value",
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} width={100} height={50} options={options} />
    </div>
  );
};

export default LineChart;
