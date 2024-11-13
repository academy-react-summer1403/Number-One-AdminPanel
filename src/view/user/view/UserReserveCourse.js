import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge } from "reactstrap";
import { ChevronDown, Eye } from "react-feather";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";

import AvatarPic from "../../../assets/images/portrait/small/noFoundImage.jpg";

// Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomPagination from "../../../@core/components/pagination";
import ChangeMoment from "../../../utility/moment";

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

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 8;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * 8) % courseReserve?.length;
    setItemOffset(newOffset);
  };

  const columns = [
    {
      sortable: true,
      maxWidth: "350px",
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
        return ChangeMoment(row.reserverDate, "YYYY/MM/DD", "persian");
      },
    },
    {
      sortable: true,
      maxWidth: "150px",
      name: "وضعیت",
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
      maxWidth: "80px",
      cell: (row) => {
        return (
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/courses/view/" + row.courseId);
            }}
          >
            <Eye size={20} />
          </a>
        );
      },
    },
  ];

  return (
    <>
      <div className="divider divider-start">
        <div className="divider-text fs-2">دوره های رزرو شده</div>
      </div>
      <DataTable
        noHeader
        responsive
        columns={columns}
        data={courseReserve?.slice(itemOffset, endOffset)}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
      />
      <div className="w-100 d-flex justify-content-end">
        <CustomPagination
          total={courseReserve?.length}
          current={1}
          rowsPerPage={8}
          handleClickFunc={handleWithOutDispatch}
        />
      </div>
    </>
  );
};

export default UserReserveCourse;
