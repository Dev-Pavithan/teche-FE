import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function Home() {
  const [data, setData] = useState({ total: 0, active: 0, blocked: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const users = JSON.parse(sessionStorage.getItem('users')) || [];
      const total = users.length;
      const active = users.filter(user => !user.blocked).length;
      const blocked = total - active;

      setData({ total, active, blocked });
    };

    fetchData();
  }, []);

  const donutChartData = {
    labels: ['Active', 'Blocked'],
    datasets: [{
      data: [data.active, data.blocked],
      backgroundColor: ['#28a745', '#dc3545'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 2,
    }],
  };

  return (
    <div className="home-container">
      <h2>Dashboard</h2>
      <div className="donut-chart-container">
        <Doughnut data={donutChartData} options={{
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  const dataset = tooltipItem.dataset;
                  const total = dataset.data.reduce((acc, value) => acc + value, 0);
                  const value = dataset.data[tooltipItem.dataIndex];
                  const percentage = ((value / total) * 100).toFixed(2);
                  return `${tooltipItem.label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }} />
        <div className="chart-info">
          <p><strong>Total Users:</strong> {data.total}</p>
          <p><strong>Active Users:</strong> {data.active} ({((data.active / data.total) * 100).toFixed(2)}%)</p>
          <p><strong>Blocked Users:</strong> {data.blocked} ({((data.blocked / data.total) * 100).toFixed(2)}%)</p>
        </div>
      </div>
    </div>
  );
}
