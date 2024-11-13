import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Eye } from "react-feather";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";

import AvatarPic from "../../../assets/images/portrait/small/noFoundImage.jpg";

// Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomPagination from "../../../@core/components/pagination";
import { useState } from "react";
import { name } from "react-date-object/calendars/julian";
import { max } from "moment/moment";
import ChangeMoment from "../../../utility/moment";

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
            <span className="text-truncate fw-bolder">{row.title}</span>
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
        return ChangeMoment(row.lastUpdate, "YYYY/MM/DD", "persian");
      },
    },
    {
      name: "اقدام",
      maxWidth: "80px",
      selector: (row) => (
        <Eye
          className="cursor-pointer"
          size={20}
          onClick={() => {
            navigate("/courses/view/" + row.courseId);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <div className="divider divider-start">
        <div className="divider-text fs-2">دوره های تایید شده</div>
      </div>
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
