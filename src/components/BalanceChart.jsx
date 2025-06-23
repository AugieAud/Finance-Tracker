import { Bar } from "react-chartjs-2";
import { CHart, BarElement, CategoryScale, LinearScale } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale);

export default function BalanceChart({ transactions }) {
  const data = {
    labels: transactions.map((t) => t.desc),
    datasets: [
      {
        label: "Amount",
        data: transactions.map((t) => t.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
}
