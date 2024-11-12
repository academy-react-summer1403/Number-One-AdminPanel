import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";

import AvatarPic from "../../../assets/images/portrait/small/noFoundImage.jpg";

// Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomPagination from "../../../@core/components/pagination";
import { useState } from "react";

const UserCourseList = () => {
  const usersCourse = useSelector(
    (state) => state.UserInfoSlice.details.courses
  );
  const navigate = useNavigate();

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 8;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * 8) % usersCourse?.length;
    setItemOffset(newOffset);
  };

  const columns = [
    {
      sortable: true,
      maxWidth: "300px",
      name: "نام دوره",
      selector: (row) => row.title,
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
              {row.title}
            </span>
          </div>
        );
      },
    },
    {
      name: "توضیحات دوره",
      maxWidth: "200px",
      selector: (row) => row.describe,
    },
    {
      name: "تاریخ آخرین بروزرسانی",
      maxWidth: "180px",
      selector: (row) => {
        row.lastUpdate;
        let sYear = row.lastUpdate && row.lastUpdate.substring(0, 4);
        let sMonth = row.lastUpdate && row.lastUpdate.substring(5, 7);
        let sDay = row.lastUpdate && row.lastUpdate.substring(8, 10);
        let stTime = sYear + "/" + sMonth + "/" + sDay;
        return stTime;
      },
    },
  ];

  return (
    <>
      <DataTable
        noHeader
        responsive
        columns={columns}
        data={usersCourse?.slice(itemOffset, endOffset)}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
      />
      <div className="w-100 d-flex justify-content-end">
        <CustomPagination
          total={usersCourse?.length}
          current={1}
          rowsPerPage={8}
          handleClickFunc={handleWithOutDispatch}
        />
      </div>
    </>
  );
};

export default UserCourseList;
