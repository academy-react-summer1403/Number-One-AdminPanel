import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Row, Table } from "reactstrap";
import CustomPagination from "../../../@core/components/pagination";
import { useState } from "react";
import { handleCourseId, handleQueryCU, handleRowsOfPage } from "../store";
import {
  GetCourses,
  GetCourseUserList,
  GetUserList,
} from "../../../@core/services/api/get-api";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import TableItems from "./TableItems";
import headerTable from "../../../@core/constants/course-user/HeaderTable";
import { HeaderTable } from "../../../@core/components/table-list/index";
import ModalApiItemList from "../../../@core/components/modal/ModalApiItemList";
import { handlePageNumber, handleQuery } from "../../user/store/FilterSlice";
import { useEffect } from "react";
import CourseTableItems from "../../courses/view/tabs/CourseAssistance/CourseTableItems";
import {
  handleCoursePageNumber,
  handleQueryCourse,
} from "../../courses/store/CourseList";

const CourseUserWrapper = () => {
  const params = useSelector((state) => state.CourseUserSlice);
  const courseParams = useSelector((state) => state.CoursesList);
  const dispatch = useDispatch();
  const [courseid, setCourseId] = useState();

  useEffect(() => {
    dispatch(handleCourseId(courseid));
  }, [courseid]);

  const { data } = useQueryWithDependencies(
    "GET_COURSE_USER",
    GetCourseUserList,
    params,
    params
  );

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + params.RowsOfPage;
  const handleMovePage = (page) => {
    const newOffset = (page.selected * params.RowsOfPage) % data?.length;
    setItemOffset(newOffset);
  };

  // Handle RowOfPage for list
  const handleRows = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(handleRowsOfPage(value));
  };

  // Choose Course Modal
  const [chooseCourseModal, setChooseCourseModal] = useState(false);
  const toggleChooseCourseModal = () =>
    setChooseCourseModal(!chooseCourseModal);

  const courseTableHeader = ["", "نام دوره", "وضعیت", "عملیات"];

  // Get All Course
  const { data: courses } = useQueryWithDependencies(
    "GET_COURSE_LIST",
    GetCourses,
    courseParams,
    { ...courseParams, RowsOfPage: 6 }
  );

  return (
    <div className="app-user-list">
      <Row>
        <Col sm="12">
          <Card className="overflow-hidden">
            <div className="react-dataTable">
              <div className="d-flex align-items-center">
                <HeaderTable
                  isCreate={false}
                  rowOfPage={params.RowsOfPage}
                  handleRowOfPage={handleRows}
                  handleSearch={handleQueryCU}
                />
                <Button
                  style={{ width: "120px", height: "39px", marginLeft: "14px" }}
                  color="primary"
                  onClick={toggleChooseCourseModal}
                >
                  انتخاب دوره
                </Button>
              </div>
              <Table hover>
                <thead className="text-center">
                  <tr>
                    {headerTable.map((item, index) => (
                      <th key={index} className="px-0">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 &&
                    data
                      ?.slice(itemOffset, endOffset)
                      ?.map((item, index) => (
                        <TableItems key={index} item={item} />
                      ))}
                </tbody>
              </Table>
              {data?.length == 0 && (
                <span className="text-center w-100 my-5 d-block">
                  دوره مورد نظر را انتخاب کنید
                </span>
              )}
            </div>
            <CustomPagination
              total={data?.length}
              current={params.PageNumber}
              rowsPerPage={params.RowsOfPage}
              handleClickFunc={handleMovePage}
            />
          </Card>
        </Col>
      </Row>
      <ModalApiItemList
        PageNumber={courseParams.PageNumber}
        RowsOfPage={courseParams.RowsOfPage}
        isOpen={chooseCourseModal}
        toggle={toggleChooseCourseModal}
        handlePageNumber={handleCoursePageNumber}
        handleQuery={handleQueryCourse}
        modalTitle={"دوره را انتخاب کنید"}
        totalCount={courses?.totalCount}
        headerTitles={courseTableHeader}
      >
        {courses?.courseDtos?.map((item, index) => (
          <CourseTableItems
            item={item}
            toggle={toggleChooseCourseModal}
            key={index}
            setId={setCourseId}
          />
        ))}
      </ModalApiItemList>
    </div>
  );
};

export default CourseUserWrapper;
