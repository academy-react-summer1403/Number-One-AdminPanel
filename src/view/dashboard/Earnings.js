// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";
import { GetDashboardReport } from "../../@core/services/api/get-api";
import { useQueryWithDependencies } from "../../utility/hooks/useCustomQuery";

const Earnings = () => {
  const { data: dashboardReport } = useQueryWithDependencies(
    "GET_DASHBOARD_REPORT",
    GetDashboardReport,
    null,
    null
  );

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ["فعال", "غیر فعال"],
    stroke: { width: 0 },
    colors: ["#5751E1", "#00cfe8"],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`;
              },
            },
            total: {
              show: true,
              offsetY: 15,
              label: "فعال",
              formatter() {
                return isNaN(Math.ceil(dashboardReport?.activeUserPercent))
                  ? "0"
                  : Math.ceil(dashboardReport?.activeUserPercent) + "%";
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120,
          },
        },
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  };
  // console.log(Number(Math.ceil(dashboardReport?.activeUserPercent)));

  return (
    <Card className="earnings-card">
      <CardBody>
        <Row>
          <Col xs="6">
            <CardTitle className="mb-1">درصد کاربران فعال</CardTitle>
            <CardText className="text-muted font-small-2">
              <span className="fw-bolder">
                {" "}
                {isNaN(Math.ceil(dashboardReport?.activeUserPercent))
                  ? "0"
                  : Math.ceil(dashboardReport?.activeUserPercent) + "%"}{" "}
                %
              </span>
              <span> درصد از کاربران در یک هفته گذشته فعال بودند</span>
            </CardText>
          </Col>
          <Col xs="6">
            <Chart
              options={options}
              series={[
                Number(Math.ceil(dashboardReport?.activeUserPercent)),
                Number(Math.ceil(dashboardReport?.interActiveUserPercent)),
              ]}
              type="donut"
              height={120}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Earnings;
