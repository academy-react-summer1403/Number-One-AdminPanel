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
} from "../../@core/services/api/get-api";
import StatsVertical from "./StatsVertical";
import getUsers from "../user/store/GetUsers";
import { handleTeachers, handleTotalCount } from "../user/store/UserInfoSlice";
import { useEffect } from "react";

const StatsCard = () => {
  const userReports = useSelector((state) => state.UserInfoSlice);

  // Getting Data from Api with use Query
  const { data: courses } = useQueryWithDependencies(
    "GET_COURSES_DATA",
    GetCourses,
    null,
    { PageNumber: 1, RowsOfPage: 1000 }
  );
  const { data: comments } = useQueryWithDependencies(
    "GET_COMMENTS_DATA",
    GetCommentsManage,
    null,
    null
  );

  const allUsers = getUsers(handleTotalCount);
  const teachers = getUsers(handleTeachers, 2);

  useEffect(() => {
    allUsers;
    teachers;
  }, []);

  const data = [
    {
      title: userReports?.totalCount.totalCount,
      subtitle: " کاربران",
      color: "primary",
      icon: <Users size={24} />,
    },
    {
      title: courses?.totalCount,
      subtitle: "دوره ها",
      color: "secondary",
      icon: <Book size={24} />,
    },
    {
      title: comments?.totalCount,
      subtitle: "کامنت ها",
      color: "success",
      icon: <Send size={24} />,
    },
    {
      title: userReports?.teachers.totalCount,
      subtitle: "اساتید",
      color: "danger",
      icon: <Award size={24} />,
    },
  ];

  return (
    <div className="app-user-list h-100" style={{marginBottom: "28px"}}>
      <Row className="h-100">
        {data?.map((item, index) => (
          <Col key={index} md="3" sm="6" className="h-100">
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
