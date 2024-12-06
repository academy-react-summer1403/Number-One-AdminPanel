// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardHeader, CardText } from "reactstrap";

// ** Default Options
// import { lineChartOptions } from './ChartOptions'

const StatsWithLineChart = ({
  icon,
  color,
  stats,
  statTitle,
  series,
  type,
}) => {

  const options = {
    chart: {
      id: statTitle,
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 5,
        left: 0,
        blur: 4,
        opacity: 0.1
      }
    },
    grid: {
      show: false
    },
    colors: [],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        gradientToColors: ['#55DD92'],
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },

    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      x: { show: false }
    }
  }
  return (
    <Card>
      <CardHeader className="align-items-start pb-0">
        <div>
          <h2 className="fw-bolder ">{stats}</h2>
          <CardText className="mb-1">{statTitle}</CardText>
        </div>
        <Avatar
          className="avatar-stats p-50 m-0"
          color={`light-${color}`}
          icon={icon}
        />
      </CardHeader>
      <Chart
        options={options}
        series={series}
        type={type}
        height={70}
      />
    </Card>
  );
};

export default StatsWithLineChart;
