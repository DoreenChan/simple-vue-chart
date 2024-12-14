export const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      type: 'bar',
      label: 'Sales',
      data: [100, 120, 150, 180, 200, 220],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      stack: '2023',
      hidden: true,
    },
    {
      type: 'bar',
      label: 'Sales',
      data: [180, 220, 200, 190, 210, 200],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      stack: '2024',
      hidden: false,
    },
    {
      type: 'line',
      label: 'Profit Margin',
      data: [20, 22, 25, 28, 30, 35],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 8,
      stack: '2023',
      hidden: true,
    },
    {
      type: 'line',
      label: 'Profit Margin',
      data: [18, 20, 26, 30, 33, 38],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 8,
      stack: '2024',
      hidden: false,
    },
  ],
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      stacked: true,
    },
  },
};

export const chartFilters = {
  checkboxes: [
    {
      id: 1,
      label: 'Sales',
    },
    {
      id: 2,
      label: 'Profit Margin',
    },
  ],
  dropdown: {
    selected: '2024',
    options: [
      {
        id: 1,
        label: '2024',
      },
      {
        id: 2,
        label: '2023',
      },
    ],
  },
};
