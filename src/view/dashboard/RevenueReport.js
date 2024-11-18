// ** React Imports

// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Row, Col, Card, CardTitle } from "reactstrap";
import { useQueryWithDependencies } from "../../utility/hooks/useCustomQuery";
import { GetCourses } from "../../@core/services/api/get-api";

const RevenueReport = (props) => {
  const coursesStatus = ["شروع ثبت نام", "درحال برگزاری", "منقضی شده"];
  // getting Data from Api with use Query
  const { data: courseData } = useQueryWithDependencies(
    "GET_COURSES_DATA",
    GetCourses,
    null,
    { PageNumber: 1, RowsOfPage: 1000 }
  );

  // Find the number of courses with different statuses
  let coursesStatusArray = [];
  for (let element of coursesStatus) {
    const courseLength = courseData?.courseDtos?.filter(
      (item) => item?.statusName === element
    );
    coursesStatusArray.push(courseLength?.length);
  }

  const revenueOptions = {
      animation: { duration: 500 },
      chart: {
        stacked: true,
        type: "bar",
        toolbar: { show: false },
      },
      grid: {
        padding: {
          top: -20,
          bottom: -10,
        },
        yaxis: {
          lines: { show: false },
        },
      },
      xaxis: {
        categories: coursesStatus,
        labels: {
          style: {
            colors: "#b9b9c3",
            fontSize: "0.86rem",
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: [props.primary, props.warning],
      plotOptions: {
        bar: {
          columnWidth: "28",
          borderRadius: [12],
          borderRadiusWhenStacked: "all",
          borderRadiusApplication: "start",
        },
        distributed: true,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#b9b9c3",
            fontSize: "0.86rem",
          },
        },
      },
    },
    revenueSeries = [
      {
        name: "تعداد",
        data: coursesStatusArray && coursesStatusArray,
      },
    ];

  return (
    <Card className="card-revenue-budget">
      <Row className="mx-0">
        <Col className="revenue-report-wrapper" md="12" xs="12">
          <div className="d-sm-flex justify-content-between align-items-center mb-3">
            <CardTitle className="mb-50 mb-sm-0">
              {" "}
              دوره ها بر اساس وضعیت
            </CardTitle>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <span className="bullet bullet-primary me-50 cursor-pointer"></span>
                <span>تعداد</span>
              </div>
            </div>
          </div>
          <Chart
            id="revenue-report-chart"
            type="bar"
            height="280"
            options={revenueOptions}
            series={revenueSeries}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default RevenueReport;
