import { Fragment, useState } from "react";
import CustomPagination from "../../../@core/components/pagination";
import { Badge} from "reactstrap";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";
import AvatarPic from "../../../assets/images/portrait/small/noFoundImage.jpg";
import { ChevronDown, Eye } from "react-feather";
import { useQueryWithoutDependencies } from "../../../utility/hooks/useCustomQuery";
import GetCourseTeacher from "../../../@core/services/api/get-api/GetCourseTeacher";
import { useNavigate } from "react-router-dom";

const TeacherCourses = () => {
  const { data, isSuccess } = useQueryWithoutDependencies(
    "GET_COURSES_TEACHER",
    GetCourseTeacher
  );

  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * 10) % data?.totalCount;
    setItemOffset(newOffset);
  };

  const columns = [
    {
      sortable: true,
      padding: "0px",
      maxWidth: "320px",
      width: "320px",
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
      maxWidth: "120px",
      minWidth: "80px",
      name: "وضعیت",
      selector: (row) =>
        row.isActive ? (
          <Badge color="success">فعال</Badge>
        ) : (
          <Badge color="danger">غیر فعال</Badge>
        ),
    },
    {
      maxWidth: "150px",
      name: "نوع",
      selector: (row) => row.typeName,
    },
    {
      maxWidth: "50px",
      name: "رزرو",
      selector: (row) => row.reserveCount,
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
    <Fragment>
      <div className="divider divider-start">
        <div className="divider-text fs-2">دوره های این معلم</div>
      </div>
      <DataTable
        noHeader
        responsive
        columns={columns}
        data={data?.teacherCourseDtos?.slice(itemOffset, endOffset)}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
      />
      <div className="w-100 d-flex justify-content-end">
        <CustomPagination
          total={data?.totalCount}
          current={1}
          rowsPerPage={8}
          handleClickFunc={handleWithOutDispatch}
        />
      </div>
    </Fragment>
  );
};

export default TeacherCourses;
