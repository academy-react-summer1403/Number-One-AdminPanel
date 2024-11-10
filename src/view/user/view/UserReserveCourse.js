import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import { ChevronDown } from "react-feather";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";

import AvatarPic from "../../../../assets/images/new/44.jpg";

// Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const UserReserveCourse = () => {
  const navigate = useNavigate();
  const usersCourse = useSelector(
    (state) => state.UserInfoSlice.details.coursesReseves
  );
  const [courseReserve, setCourseReserve] = useState([]);

  useEffect(() => {
    if (!usersCourse) return;
    setCourseReserve(usersCourse.filter((item) => item.accept === false));
  }, [usersCourse]);

  const columns = [
    {
      sortable: true,
      maxWidth: "300px",
      name: "نام دوره",
      selector: (row) => row.courseName,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {row.tumbImageAddress != null ? (
                <Avatar
                  className="me-1"
                  img={row.tumbImageAddress}
                  alt="#"
                  imgWidth="32"
                />
              ) : (
                <Avatar
                  className="me-1"
                  img={AvatarPic}
                  alt="#"
                  imgWidth="32"
                />
              )}
            </div>
            <span
              className="text-truncate fw-bolder"
              onClick={() => {
                navigate("/courses/view/" + row.courseId);
              }}
            >
              {row.courseName}
            </span>
          </div>
        );
      },
    },
    {
      name: "تاریخ رزرو دوره",
      maxWidth: "200px",
      selector: (row) => {
        row.reserverDate;
        let sYear = row.reserverDate && row.reserverDate.substring(0, 4);
        let sMonth = row.reserverDate && row.reserverDate.substring(5, 7);
        let sDay = row.reserverDate && row.reserverDate.substring(8, 10);
        let stTime = sYear + "/" + sMonth + "/" + sDay;
        return stTime;
      },
    },
    {
      sortable: true,
      maxWidth: "200px",
      name: "وضعیت دوره ",
      selector: (row) =>
        row.accept ? (
          <Badge color={row.accept ? "light-primary" : "light-danger"}>
            تایید شده{" "}
          </Badge>
        ) : (
          <Badge color={row.accept ? "light-primary" : "light-danger"}>
            رزرو شده
          </Badge>
        ),
    },
    {
      name: "عملیات",
      maxWidth: "200px",
      cell: (row) => {
        return (
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/courses/view/" + row.courseId);
            }}
          >
            <Button>جزئیات</Button>
          </a>
        );
      },
    },
  ];

  return (
    <DataTable
      noHeader
      responsive
      columns={columns}
      data={courseReserve}
      className="react-dataTable"
      sortIcon={<ChevronDown size={10} />}
    />
  );
};

export default UserReserveCourse;
