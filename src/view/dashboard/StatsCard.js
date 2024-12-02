// ** Third Party Components
import { Users, Book, Send, Award } from "react-feather";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";
// import { getAllUsers } from "../user/store/getAllUsers";
import { useSelector } from "react-redux";
import { useQueryWithDependencies } from "../../utility/hooks/useCustomQuery";
import {
  GetCommentsManage,
  GetCourses,
  GetDashboardReport,
} from "../../@core/services/api/get-api";
import StatsVertical from "./StatsVertical";
import getUsers from "../user/store/GetUsers";
import { handleTeachers, handleTotalCount } from "../user/store/UserInfoSlice";
import { useEffect, useState } from "react";
import { generalStatistics } from "../../@core/constants/dashboard";

const StatsCard = () => {
  const userReports = useSelector((state) => state.UserInfoSlice);
  const [data, setData] = useState([]);
  const teachers = getUsers(handleTeachers, 2);

  // Getting Data from Api with use Query
  const { data: courses, isSuccess: courseSuccess } = useQueryWithDependencies(
    "GET_COURSES_DATA",
    GetCourses,
    null,
    { PageNumber: 1, RowsOfPage: 1000 }
  );
  const { data: comments, isSuccess: commentSuccess } =
    useQueryWithDependencies(
      "GET_COMMENTS_DATA",
      GetCommentsManage,
      null,
      null
    );

  const {
    data: dashboardReport,
    isRefetching,
    isSuccess: reportSuccess,
  } = useQueryWithDependencies(
    "GET_DASHBOARD_REPORT",
    GetDashboardReport,
    null,
    null
  );
  // console.log(dashboardReport);

  useEffect(() => {
    teachers;
    if (dashboardReport && courses && userReports && comments) {
      setData(
        generalStatistics(courses, comments, userReports, dashboardReport)
      );
    }
  }, [reportSuccess, commentSuccess, courseSuccess]);

  // console.log(data);
  return (
    <div className="app-user-list h-100" style={{ marginBottom: "28px" }}>
      <Row className="h-100">
        {data?.map((item, index) => (
          <Col key={index} md="3" sm="6" className="mb-1">
            <StatsVertical
              holderStyle="h-100 mb-0"
              key={index}
              stats={item.title}
              statTitle={item.subtitle}
              color={item.color}
              icon={item.icon}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StatsCard;
