// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { GetCourses, GetUserList } from "../../@core/services/api/get-api";
import { useQueryWithDependencies } from "../../utility/hooks/useCustomQuery";

const GoalOverview = (props) => {
  // getting Data for api with use Query
  const { data: coursesData } = useQueryWithDependencies(
    "GET_COURSES_DATA",
    GetCourses,
    null,
    { PageNumber: 1, RowsOfPage: 1000 }
  );
  const { data: AllUsers } = useQueryWithDependencies(
    "GET_USERS_DATA",
    GetUserList,
    null,
    { PageNumber: 1, RowsOfPage: 1000 }
  );
  console.log(AllUsers);

  // VARIANTS
  const dataVariant = {
    userProfile: AllUsers?.listUser,
    activeCourses: coursesData?.courseDtos,
  };
  const dataFilterVariant = {
    userProfile: AllUsers?.listUser?.filter(
      (item) => item.profileCompletionPercentage >= "70"
    ),
    activeCourses: coursesData?.courseDtos?.filter(
      (item) => item?.isActive === true
    ),
  };

  /* Calculations to obtain the desired values */
  const focusItem = dataFilterVariant?.[props.variant];
  const allItemNum = dataVariant?.[props.variant]?.length;
  const focusItemNum = focusItem?.length;
  const notFocusItemNum = allItemNum - focusItemNum;
  const focusItemPercent = Math.round((focusItemNum / allItemNum) * 100);

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
          gradientToColors: [props.success],
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
    series = [isNaN(focusItemPercent) ? 0 : focusItemPercent];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{props.texts.title}</CardTitle>
      </CardHeader>
      <CardBody className="p-0">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={245}
        />
      </CardBody>
      <Row className="border-top text-center mx-0">
        <Col xs="6" className="py-1 border-end">
          <CardText className="text-muted mb-0">
            {props.texts.focusText}
          </CardText>
          <h3 className="fw-bolder mb-0">
            {isNaN(focusItemNum) ? 0 : focusItemNum}
          </h3>
        </Col>
        <Col xs="6" className="py-1">
          <CardText className="text-muted mb-0">
            {props.texts.orderText}
          </CardText>
          <h3 className="fw-bolder mb-0">
            {isNaN(notFocusItemNum) ? 0 : notFocusItemNum}
          </h3>
        </Col>
      </Row>
    </Card>
  );
};
export default GoalOverview;
