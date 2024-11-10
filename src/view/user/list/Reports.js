import { useSelector } from "react-redux";
import { useEffect } from "react";

// Get Users Function
import getUsers from "../store/GetUsers";

// Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// User Info Actions
import {
  handleAdmins,
  handleStudents,
  handleTeachers,
  handleTotalCount,
} from "../store/UserInfoSlice";

const UsersReport = () => {
  const total = getUsers(handleTotalCount);
  const admins = getUsers(handleAdmins, 1);
  const teachers = getUsers(handleTeachers, 2);
  const students = getUsers(handleStudents, 5);

  const userReports = useSelector((state) => state.UserList);

  const userReport = [
    {
      title: "کل کاربران",
      color: "primary",
      stats: userReports.totalCount.totalCount,
      icon: User,
    },
    {
      title: "ادمین ها",
      color: "danger",
      stats: userReports.admins.totalCount,
      icon: UserPlus,
    },
    {
      title: "اساتید",
      color: "success",
      stats: userReports.teachers.totalCount,
      icon: UserCheck,
    },
    {
      title: "دانشجویان",
      color: "warning",
      stats: userReports.students.totalCount,
      icon: UserX,
    },
  ];

  useEffect(() => {
    total;
    admins;
    teachers;
    students;
  }, []);

  return userReport.map((item, index) => (
    <Col key={index} lg="3" sm="6">
      <StatsHorizontal
        color={item.color}
        statTitle={item.title}
        icon={<item.icon size={20} />}
        renderStats={<h3 className="fw-bolder mb-75">{item.stats}</h3>}
      />
    </Col>
  ));
};

export default UsersReport;
