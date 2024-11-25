// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import Chart from "react-apexcharts";
import { HelpCircle } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  CardText,
} from "reactstrap";
import { useSelector } from "react-redux";

const GoalOverview = ({ success, paymentDone, paymentNotDone }) => {
  const calculatePopularity = (paymentDone, paymentNotDone) => {
    let totalVotes = paymentDone + paymentNotDone;
    let popularity = (paymentDone / totalVotes) * 100;
    if (isNaN(popularity)) return 0;
    else return Math.round(popularity);
  };

  const options = {
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      colors: ["#5751E1"],
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "77%",
          },
          track: {
            background: "#ebe9f1",
            strokeWidth: "50%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              color: "#5e5873",
              fontFamily: "Montserrat",
              fontSize: "2.86rem",
              fontWeight: "600",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      grid: {
        padding: {
          bottom: 30,
        },
      },
    },
    series = [calculatePopularity(paymentDone, paymentNotDone)];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">درصد پرداختی های دوره</CardTitle>
      </CardHeader>
      <CardBody className="p-0 mb-4">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={245}
        />
      </CardBody>
      <Row className="border-top text-center mx-0">
        <Col xs="6" className="py-1 border-end">
          <CardText className="text-muted mb-0">پرداخت شده</CardText>
          <h3 className="fw-bolder mb-0">{paymentDone}</h3>
        </Col>
        <Col xs="6" className="py-1">
          <CardText className="text-muted mb-0">پرداخت نشده</CardText>
          <h3 className="fw-bolder mb-0">{paymentNotDone}</h3>
        </Col>
      </Row>
    </Card>
  );
};
export default GoalOverview;
