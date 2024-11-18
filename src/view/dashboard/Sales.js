// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardHeader } from "reactstrap";
import { GetCommentsManage } from "../../@core/services/api/get-api";
import { PopularCoursesTitle } from "../../@core/constants/courses";
import { useQueryWithDependencies } from "../../utility/hooks/useCustomQuery";

const Sales = (props) => {
  // getting Data from Api with use Query
  const { data: commentData } = useQueryWithDependencies(
    "GET_COMMENT_DATA",
    GetCommentsManage,
    null,
    { PageNumber: 1, RowsOfPage: 1000 }
  );
  // console.log(commentData)
  // Obtaining the number of comments of course categories and adding to the presentation
  let coursesCategoryArray = [];
  for (let element of PopularCoursesTitle) {
    const commentsLength = commentData?.comments?.filter(
      (item) => item.courseTitle.indexOf(element) != -1
    );
    coursesCategoryArray.push(commentsLength?.length);
  }

  const options = {
      chart: {
        height: 300,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 8,
          left: 1,
          top: 1,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        offsetY: 5,
      },
      stroke: {
        width: 0,
      },
      dataLabels: {
        background: {
          foreColor: ["#ebe9f1"],
        },
      },
      legend: { show: false },
      colors: [props.primary, props.info],
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: [
              "#ebe9f1",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
            ],
            connectorColors: "transparent",
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: [props.primary, props.info],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      labels: ["ReactJs", "TailwindCss", "NextJs", "Back-End", "Angular", "UX"],
      markers: {
        size: 0,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
        padding: {
          bottom: -27,
        },
      },
    },
    series = [
      {
        name: "Sales",
        data: coursesCategoryArray && coursesCategoryArray,
      },
    ];
  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-start pb-1">
        <div>
          <CardTitle className="mb-25" tag="h4">
            تعداد کامنت ها برحسب دسته بندی دوره ها
          </CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        {options && series && (
          <Chart options={options} series={series} type="radar" height={300} />
        )}
      </CardBody>
    </Card>
  );
};
export default Sales;
