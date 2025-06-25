import { Line } from "react-chartjs-2";
import { 
  Chart, 
  LineElement, 
  PointElement, 
  CategoryScale, 
  LinearScale, 
  TimeScale,
  Tooltip,
  Legend
} from "chart.js";

// Register the required chart.js components
Chart.register(
  LineElement, 
  PointElement, 
  CategoryScale, 
  LinearScale, 
  TimeScale,
  Tooltip,
  Legend
);

export default function WeeklyTrendChart({ transactions }) {
  // Group transactions by week
  const groupedByWeek = groupTransactionsByWeek(transactions);
  
  // Sort weeks chronologically
  const sortedWeeks = Object.keys(groupedByWeek).sort();
  
  // Prepare data for the chart
  const data = {
    labels: sortedWeeks,
    datasets: [
      {
        label: "Weekly Spending",
        data: sortedWeeks.map(week => {
          // Calculate total spending for the week (negative amounts are expenses)
          return groupedByWeek[week].reduce((total, tx) => {
            // Only count negative amounts as spending
            return total + (tx.amount < 0 ? Math.abs(tx.amount) : 0);
          }, 0);
        }),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Weekly Income",
        data: sortedWeeks.map(week => {
          // Calculate total income for the week (positive amounts are income)
          return groupedByWeek[week].reduce((total, tx) => {
            // Only count positive amounts as income
            return total + (tx.amount > 0 ? tx.amount : 0);
          }, 0);
        }),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Week'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const weekLabel = tooltipItems[0].label;
            return `Week: ${weekLabel}`;
          },
          label: (tooltipItem) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const value = dataset.data[tooltipItem.dataIndex];
            return `${dataset.label}: $${value.toFixed(2)}`;
          }
        }
      },
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  return (
    <div className="chart-container">
      <h3>Weekly Finance Trend</h3>
      <div className="chart-wrapper">
        {sortedWeeks.length > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <p>Add transactions with dates to see weekly trends</p>
        )}
      </div>
    </div>
  );
}

// Helper function to group transactions by week
function groupTransactionsByWeek(transactions) {
  const grouped = {};
  
  transactions.forEach(tx => {
    if (!tx.date) return;
    
    // Get the week number and year for the transaction date
    const date = new Date(tx.date);
    const weekInfo = getWeekNumber(date);
    const weekLabel = `${weekInfo.year}-W${weekInfo.week.toString().padStart(2, '0')}`;
    
    if (!grouped[weekLabel]) {
      grouped[weekLabel] = [];
    }
    
    grouped[weekLabel].push(tx);
  });
  
  return grouped;
}

// Helper function to get ISO week number from a date
function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum = Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7) + 1;
  
  return { 
    week: weekNum,
    year: d.getFullYear() 
  };
}
