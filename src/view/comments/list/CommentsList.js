import React, { useState } from "react";
import {
  MoreVertical,
  Trash,
  Eye,
  User,
  CheckSquare,
  XSquare,
  Send,
} from "react-feather";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Card } from "reactstrap";
// import CommntModal from "./commentModall/comModal";
// import "@styles/react/libs/react-select/_react-select.scss";
// import "@styles/react/libs/tables/react-dataTable-component.scss";
// import ReplyComment from "./reply/ReplyCom";
// import { setPageNumber } from "../../../redux/slices/filter-box/commentSlice";

import CustomHeader from "./CustomHeader";
import HeaderTable from "../../../@core/components/header-table/HeaderTable";
import { CommentTableTitles } from "../../../@core/constants/comments";
import GetAllComments from "../../../@core/services/api/get-api/GetAllComments";
import { useMutationWithRefetch, useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { useDispatch, useSelector } from "react-redux";
import AcceptCommentCourse from "../../../@core/services/api/post-api/AcceptCommentCourse";
import DeleteCourseComment from "../../../@core/services/api/delete-api/DeleteCourseComment";
import RejectCourseComment from "../../../@core/services/api/post-api/RejectCourseComment";
import GetReplayComments from "../../../@core/services/api/get-api/GetReplayComments";
import CustomPagination from "../../../@core/components/pagination";
import { setPageNumber } from "../store/CommentsList";
import ReplyCommentModal from "../ReplyCommentModal";
import AddReplayComment from "../../../@core/services/api/post-api/AddReplayComment";

const CommentsList = () => {
  const commentFilterObj = useSelector((state) => state.CommentList);
  const dispatch = useDispatch();

  const [commentModal, setCommentModal] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const idsObj = { courseId: courseId, commentId: commentId };
  const [describe, setDescribe] = useState("");
  const [repShow, setRepShow] = useState(false);

  // getting The data from Api with use Query
  const { data: commentsData, refetch: refetchComment } =
    useQueryWithDependencies(
      "GET_COMMENTS_DATA",
      GetAllComments,
      commentFilterObj,
      commentFilterObj
    );

  const { data: ReplayData, refetch: refetchReplay } = useQueryWithDependencies(
    "GET_REPLAY_COMMENT_DATA",
    GetReplayComments,
    idsObj,
    idsObj,
    {
      // enabled: !!(idsObj.courseId && idsObj.commentId),
    }
  );

  // Adding data from api with use mutation
  const { mutate: acceptComment } = useMutationWithRefetch(
    "ACCEPT_COMMENT",
    AcceptCommentCourse ,
    refetchComment,
    refetchReplay
  );
  const { mutate: declineComment } = useMutationWithRefetch(
    "DECLINE_COMMENT",
    RejectCourseComment,
    refetchComment,
    refetchReplay
  );

  // remove data from api with use mutation
  const { mutate: deleteComment } = useMutationWithRefetch(
    "DELETE_COMMENT",
    DeleteCourseComment,
    refetchComment,
    refetchReplay
  );

  const DropdownItemArray = [
    { text: "تایید", icon: CheckSquare, apiFunction: acceptComment },
    { text: "حذف", icon: Trash, apiFunction: deleteComment },
    { text: "رد کردن", icon: XSquare, apiFunction: declineComment },
    {
      text: "پاسخ",
      icon: Send,
      apiFunction: setCommentId,
      other: () => {
        setRepShow(!repShow);
      },
      SetCourseId: setCourseId,
    },
  ];
  const handlePagination = (page) => {
    dispatch(setPageNumber(page.selected + 1));
  };
  return (
    <div>
      <Card>
        <div className="react-dataTable ">
          <CustomHeader />
          <div style={{ overflowX: "auto" }}>
            <Table hover>
              <HeaderTable titles={CommentTableTitles} />
              {commentsData?.comments?.length !== 0 ? (
                commentsData?.comments?.map((item, index) => {
                  const tooltipId = `tooltip-${index}`;
                  return (
                    <tbody key={index}>
                      <tr>
                        <td
                          className=" px-0 "
                          style={{
                            maxWidth: "130px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <span className="mx-1 rounded border p">
                            <User />
                          </span>
                          <span>{item.userFullName}</span>
                        </td>
                        <td className="pr-0 pl-1" style={{ maxWidth: "150px" }}>
                          {item.commentTitle}
                        </td>
                        <td
                          className="pr-0 pl-1"
                          id={tooltipId}
                          style={{
                            maxWidth: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.describe}
                        </td>
                        <td className="px-0">{item.courseTitle}</td>
                        <td className="px-0 text-center">
                          {item.accept === true ? (
                            <Badge pill color="light-primary" className="me-1">
                              تایید شده
                            </Badge>
                          ) : (
                            <Badge pill color="light-warning" className="me-1">
                              تایید نشده
                            </Badge>
                          )}
                        </td>
                        <td
                          className="p-0 text-center"
                          style={{
                            maxWidth: "20px",
                            minWidth: "20px",
                          }}
                        >
                          {item.replyCount > 0 ? (
                            <Eye
                              style={{ width: "18px", height: "16px" }}
                              onClick={() => {
                                setCommentModal(!commentModal);
                                setCourseId(item.courseId);
                                setCommentId(item.commentId);
                                setDescribe(item.describe);
                              }}
                            />
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-0 text-center">
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
                              {(item.accept === false
                                ? DropdownItemArray.slice(0, 2)
                                : DropdownItemArray.slice(1, 4)
                              ).map((dropDown, index) => (
                                <DropdownItem
                                  key={index}
                                  onClick={() => {
                                    dropDown.apiFunction(item.commentId);
                                    dropDown.other && dropDown.other();
                                    dropDown.SetCourseId &&
                                      dropDown.SetCourseId(item.courseId);
                                  }}
                                >
                                  <dropDown.icon className="me-50" size={15} />
                                  <span className="align-middle">
                                    {dropDown.text}
                                  </span>
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              ) : (
                <div className="container">
                <span className="row justify-content-center py-2"> کامنتی پیدا نشد!</span>
                </div>
              )}
            </Table>
          </div>
        </div>
      </Card>
      <CustomPagination 
        total={commentsData?.totalCount}
        current={commentFilterObj?.PageNumber}
        rowsPerPage={commentFilterObj?.RowsOfPage}
        handleClickFunc={handlePagination}
      />
      {/* <CommntModal
        setCommentModal={setCommentModal}
        commentModal={commentModal}
        replayData={ReplayData}
        handleAcceptComment={acceptComment}
        handleDeclineComment={declineComment}
        handleDeleteComment={deleteComment}
        describe={describe}
        ids={idsObj}
        refetch={() => {
          refetchComment();
          refetchReplay();
        }}
      /> */}
      <ReplyCommentModal
        repShow={repShow}
        setRepShow={setRepShow}
        addReplyComment={AddReplayComment}
        ids={idsObj}
        refetch={() => {
          refetchComment();
          refetchReplay();
        }}
      />
    </div>
  );
};

export default CommentsList;
