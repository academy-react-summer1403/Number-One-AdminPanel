import {
  MoreVertical,
  Edit,
  Trash,
  FileText,
  Delete,
  Send,
  X,
  Check,
  CheckCircle,
} from "react-feather";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

// ** React Imports
import { Fragment, useState } from "react";


// ** Reactstrap Imports
import {
  Card,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useMutationWithRefetch, useQueryWithDependencies } from "../../../../utility/hooks/useCustomQuery";
import CustomPagination from "../../../../@core/components/pagination";
import { GetCourseReserve } from "../../../../@core/services/api/get-api";
import { DeleteCourseReserve } from "../../../../@core/services/api/delete-api";

const CourseUsers = ({
  setUserSel,
  centeredModal,
  setCenteredModal,
  refetchChange,
}) => {
  const { id } = useParams();

  // Getting reserved data from Api with use Query
  const { data, refetch } = useQueryWithDependencies(
    "GET_COURSE_RESERVED",
    GetCourseReserve,
    refetchChange,
    id
  );

  // Accept and Delete data with use Mutation
  const { mutate: deleteReserve } = useMutationWithRefetch(
    "DELETE_RESERVE_COURSE",
    DeleteCourseReserve,
    refetch
  );
  const navigate = useNavigate();

  // Pagination
  const [PageNumber, setPageNumber] = useState(1);
  const [RowsOfPage, setRowsOfPage] = useState(8);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * RowsOfPage) % data?.length;
    setItemOffset(newOffset);
  };

  return (
    <Fragment>
      <Card>
        <div className="react-dataTable">
          <Table hover style={{ overflow: "visible" }}>
            <thead className="text-center">
              <tr>
                {/* <th>کاربر</th> */}
                <th>نام کاربر</th>
                <th> نام دوره</th>
                <th>وضعیت</th>
                <th>اقدام</th>
              </tr>
            </thead>
            {data &&
              data.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr className="text-center ">
                      <td
                        className=" px-0"
                        onClick={() => {
                          navigate(`/users/view/${item.studentId}`);
                        }}
                      >
                        {item.studentName}
                      </td>
                      <td className=" px-0">{item.courseName}</td>
                      <td className=" px-0">
                        <Badge
                          pill
                          color={item.accept ? "light-primary" : "light-danger"}
                          className="me-1"
                        >
                          {item.accept ? "تایید شده" : "تایید نشده"}
                        </Badge>
                      </td>
                      <td>
                        {item.accept ? (
                          ""
                        ) : (
                          <>
                            <UncontrolledDropdown direction="start">
                              <DropdownToggle
                                className="icon-btn hide-arrow"
                                color="transparent"
                                size="sm"
                                caret
                              >
                                <MoreVertical size={15} />
                              </DropdownToggle>
                              <DropdownMenu className="d-flex flex-column p-0 ">
                                <DropdownItem
                                  onClick={() => {
                                    // getCourseG();
                                    setUserSel(item);
                                    setCenteredModal(!centeredModal);
                                  }}
                                >
                                  <CheckCircle className="me-50" size={15} />{" "}
                                  <span className="align-middle">تایید</span>
                                </DropdownItem>
                                <DropdownItem divider className="p-0 m-0" />

                                {/* <Button
                                  onClick={() => {
                                    getCourseG();
                                    setUserResSelect(item);
                                  }}
                                  color="transparent"
                                >
                                  تایید
                                </Button> */}

                                <DropdownItem
                                  onClick={() => deleteReserve(item.reserveId)}
                                >
                                  <Delete className="me-50" size={15} />{" "}
                                  <span className="align-middle">حذف</span>
                                </DropdownItem>

                                {/* <Button color="transparent">حذف</Button> */}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </div>
      </Card>
      {data?.length == 0 ? (
        <div className="mx-auto my-8" style={{ textAlign: "center" }}>
          کاربری پیدا نشد
        </div>
      ) : null}
      <CustomPagination
        total={data?.length}
        current={PageNumber}
        rowsPerPage={RowsOfPage}
        handleClickFunc={handleWithOutDispatch}
      />
    </Fragment>
  );
};

export default CourseUsers;
