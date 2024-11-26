import { MoreVertical, Edit, Delete } from "react-feather";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Card } from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMutationWithRefetch, useQueryWithDependencies } from "../../../../utility/hooks/useCustomQuery";
import { GetCourseComment } from "../../../../@core/services/api/get-api";
import { AcceptCommentCourse, RejectCourseComment } from "../../../../@core/services/api/post-api";
import { DeleteCourseComment } from "../../../../@core/services/api/delete-api";
import CustomPagination from "../../../../@core/components/pagination";

const CourseCom = ({}) => {
  const { id } = useParams();
  const headerTable = [
    "نام کاربر",
    "عنوان کامنت",
    "متن کامنت",
    "وضعیت",
    "اقدام",
  ];
  const { data: commentData, refetch } = useQueryWithDependencies(
    "GET_COURSE_COMMENTS",
    GetCourseComment,
    id,
    id
  );
  const { mutate: acceptMutate } = useMutationWithRefetch(
    "ACCEPT_COURSE_COMMENT",
    AcceptCommentCourse,
    refetch
  );
  const { mutate: rejectMutate } = useMutationWithRefetch(
    "REJECT_COURSE_COMMENT",
    RejectCourseComment,
    refetch
  );
  const { mutate: deleteMutate } = useMutationWithRefetch(
    "DELETE_COURSE_COMMENT",
    DeleteCourseComment,
    refetch
  );

  // Pagination
  const [PageNumber, setPageNumber] = useState(1);
  const [RowsOfPage, setRowsOfPage] = useState(8);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * RowsOfPage) % commentData?.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <Card className="">
        <div className="react-dataTable">
          <Table hover>
            <thead>
              <tr>
                {headerTable.map((item, index) => (
                  <th key={index} className="px-0">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            {commentData &&
              commentData.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td style={{ maxWidth: "160px" }} className=" px-1">
                        {item.author ? item.author : item.courseTitle}
                      </td>
                      <td
                        className="px-0"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "130px",
                        }}
                      >
                        {item.title ? item.title : item.commentTitle}
                      </td>
                      <td style={{ maxWidth: "220px" }} className=" p-0">
                        {item.describe}
                      </td>
                      <td
                        className=" p-0"
                        onClick={
                          item.accept === true
                            ? () =>
                                rejectMutate(item.id ? item.id : item.commentId)
                            : () =>
                                acceptMutate(item.id ? item.id : item.commentId)
                        }
                      >
                        <Badge
                          pill
                          color={item.accept ? "light-primary" : "light-danger"}
                          className="me-1"
                        >
                          {item.accept === true ? "تایید شده" : " تایید نشده"}
                        </Badge>
                      </td>
                      <td className=" p-0">
                        <UncontrolledDropdown direction="start">
                          <DropdownToggle
                            className="icon-btn hide-arrow"
                            color="transparent"
                            size="sm"
                            caret
                          >
                            <MoreVertical size={15} />
                          </DropdownToggle>
                          <DropdownMenu className="d-flex flex-column p-0">
                            {item.accept ? (
                              <DropdownItem
                                onClick={() =>
                                  rejectMutate(
                                    item.id ? item.id : item.commentId
                                  )
                                }
                              >
                                <Delete className="me-50" size={15} />{" "}
                                <span className="align-middle">عدم تایید</span>
                              </DropdownItem>
                            ) : (
                              <DropdownItem
                                onClick={() =>
                                  acceptMutate(
                                    item.id ? item.id : item.commentId
                                  )
                                }
                              >
                                <Edit className="me-50" size={15} />{" "}
                                <span className="align-middle">تایید</span>
                              </DropdownItem>
                            )}
                            <DropdownItem divider className="p-0 m-0" />
                            <DropdownItem
                              onClick={() =>
                                deleteMutate(item.id ? item.id : item.commentId)
                              }
                            >
                              <Delete className="me-50" size={15} />{" "}
                              <span className="align-middle"> حذف </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </div>
      </Card>
      {commentData?.length == 0 ? (
        <div className="mx-auto my-6" style={{ textAlign: "center" }}>
          کامنتی پیدا نشد
        </div>
      ) : null}
      <CustomPagination
        total={commentData?.length}
        current={PageNumber}
        rowsPerPage={RowsOfPage}
        handleClickFunc={handleWithOutDispatch}
      />
    </>
  );
};

export default CourseCom;
