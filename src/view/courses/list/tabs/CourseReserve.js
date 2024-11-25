// ** Images
import IMG from "../../../../assets/images/portrait/small/man.jpg";

// ** Reactstrap Imports
import { Table, Badge, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetReservedCourses } from "../../../../@core/services/api/get-api";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import CustomPagination from "../../../../@core/components/pagination";
import { CourseTableTitles } from "../../../../@core/constants/courses";

// **start
const CourseReserve = () => {
  const [coursesState, setCoursesState] = useState([]);
  const [PageNumber, setPageNumber] = useState(1);
  const [RowsOfPage, setRowsOfPage] = useState(18);

  // Getting Courses Reserved from API
  const getAllReserve = async () => {
    try {
      const result = await GetReservedCourses();
      const resultFilter = result.filter((element) => {
        return element.accept === false;
      });
      setCoursesState(resultFilter);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  useEffect(() => {
    getAllReserve();
  }, []);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * RowsOfPage) % coursesState.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Table hover>
        <HeaderTable titles={CourseTableTitles} />
        <tbody style={{ overflowX: "auto" }}>
          {coursesState &&
            coursesState.slice(itemOffset, endOffset)?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={IMG}
                      className="me-75"
                      alt="img"
                      height="20"
                      width="20"
                    />
                    <span className="align-middle fw-bold">
                      {item.studentName}{" "}
                    </span>
                  </td>
                  <td>{item.courseName}</td>
                  {/* <td>{item.reserverDate}</td> */}
                  <td>
                    <Badge pill color="light-danger" className="me-1">
                      تایید نشده
                    </Badge>
                  </td>
                  <td>
                    <Link
                      to={"/courses/view/" + item.courseId}
                      state={{ tab: "3" }}
                    >
                      <Button>جزئیات</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <CustomPagination
        total={coursesState?.length}
        current={PageNumber}
        rowsPerPage={RowsOfPage}
        handleClickFunc={handleWithOutDispatch}
      />
    </>
  );
};

export default CourseReserve;
