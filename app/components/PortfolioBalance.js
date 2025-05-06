'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

export default function PortfolioBalance() {
  const data = {
    labels: ['Jan 15', 'Jan 20', 'Jan 25', 'Jan 30', 'Feb 05', 'Feb 10', 'Feb 15'],
    datasets: [
      {
        label: 'Portfolio',
        data: [400, 450, 480, 500, 520, 560, 769],
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: '#3b82f6',
        tension: 0.4,
      },
    ],
  }

  const options = {
    plugins: { legend: { display: false } },
    scales: { y: { display: false }, x: { display: false } },
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-gray-600">Portfolio Balance</h2>
          <p className="text-3xl font-bold mt-1">$769.28</p>
          <p className="text-green-500 font-semibold mt-1">+ $438.38 All Time</p>
        </div>
        <p className="text-gray-400 text-sm">Monthly ▼</p>
      </div>
      <div className="mt-6">
        <Line data={data} options={options} height={80} />
      </div>
    </div>
  )
}
