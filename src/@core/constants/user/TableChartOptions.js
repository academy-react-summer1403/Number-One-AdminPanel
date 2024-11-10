const tableChartOptions = {
  type: "radialBar",
  series: [54.4],
  height: 50,
  width: 80,
  options: {
    grid: {
      show: false,
      padding: {
        left: -10,
        right: 25,
        top: -13,
        bottom: -10,
      },
    },
    colors: ["#5751E1"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "35%",
        },
        track: {
          background: "#ebe9f1",
          strokeWidth: "50%",
        },
        dataLabels: {
          showOn: "always",
          colors: ["#5751E1"],
          name: {
            show: false,
          },
          value: {
            show: false,
            fontSize: "10px",
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
  },
};

export default tableChartOptions;
