const optionsForChart = {
  layout: {
    padding: {
      left: 0,
      right: 30,
      top: 10,
      bottom: 20,
    },
  },
  scales: {
    xAxes: [
      {
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        gridLines: {
          offsetGridLines: true,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          padding: 25,
          beginAtZero: true,
          suggestedMax: 50,
          maxTicksLimit: 5,
        },
      },
    ],
  },
};

export default optionsForChart;
