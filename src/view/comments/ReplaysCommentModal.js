// ** React Importsco
import { useState } from "react";
import {
  CheckSquare,
  MoreVertical,
  Send,
  Trash,
  XSquare,
} from "react-feather";
import Avatar from "@components/avatar";
import avatarImg from "../../assets/images/portrait/small/jpmen.jpg";

// ** Reactstrap Imports
import {
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Tooltip,
} from "reactstrap";
import AddReplyCommentModal from "./AddReplyCommentModal";
import AddReplayComment from "../../@core/services/api/post-api/AddReplayComment";
import HeaderTable from "../../@core/components/header-table/HeaderTable";
import { ReplayTableTitles } from "../../@core/constants/comments";

const ReplaysCommentModal = ({
  setCommentModal,
  commentModal,
  replayData,
  handleAcceptComment,
  handleDeclineComment,
  handleDeleteComment,
  describe,
  refetch,
}) => {
  // ** States
  const [tooltipOpenn, setTooltipOpenn] = useState({});
  const [repComm, setRepComm] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  // console.log(courseId)
  // console.log(commentId)


   const DropdownItemArray = [
    { text: "تایید", icon: CheckSquare, apiFunction: handleAcceptComment },
    { text: "حذف", icon: Trash, apiFunction: handleDeleteComment },
    { text: "رد کردن", icon: XSquare, apiFunction: handleDeclineComment },
    {
      text: "پاسخ",
      icon: Send,
      apiFunction: setCommentId,
      other: () => {
        setRepComm(!repComm);
      },
      SetCourseId: setCourseId,
    },
  ];
  
  const toggleTooltipp = (id) => {
    setTooltipOpenn({ ...tooltipOpenn, [id]: !tooltipOpenn[id] });
  };

  return (
    <div className="demo-inline-spacing">
      <div className="vertically-centered-modal">
        <Modal
          isOpen={commentModal}
          toggle={() => setCommentModal(!commentModal)}
          className="modal-dialog-centered "
          style={{ minWidth: "900px" }}
        >
          <ModalHeader
            toggle={() => setCommentModal(!commentModal)}
            className="pt-2"
          >
            پاسخ ها به کامنت: {describe}
          </ModalHeader>
          <ModalBody>
            <Table hover>
            <HeaderTable titles={ReplayTableTitles} />
              {replayData &&
                replayData?.map((item, index) => {
                  const tooltipIdd = `tooltip-${index}`;

                  return (
                    <tbody key={index}>
                      <tr>
                        <td
                          className="px-0  border"
                          style={{ minWidth: "155px" }}
                        >
                          <span className="mx-1 border">
                            <Avatar img={avatarImg} />
                          </span>

                          <span className=" ">{item.author}</span>
                        </td>
                        <td
                          className="px-0 border"
                          style={{
                            maxWidth: "160px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </td>
                        <td
                          id={tooltipIdd}
                          className="px-0 border"
                          style={{ minWidth: "280px" }}
                        >
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpenn[tooltipIdd]}
                            toggle={() => toggleTooltipp(tooltipIdd)}
                            innerClassName="table-tooltip"
                            target={tooltipIdd}
                          >
                            {item.describe}
                          </Tooltip>
                          {item.describe}
                        </td>
                        <td
                          className="px-0 text-center border"
                          style={{ maxWidth: "20px" }}
                        >
                          {item.accept ? (
                            <Badge pill color="light-success" className="">
                              تایید شده
                            </Badge>
                          ) : (
                            <Badge pill color="light-warning" className="">
                              تایید نشده
                            </Badge>
                          )}
                        </td>
                        <td
                          className="px-0 text-center"
                          style={{ maxWidth: "10px" }}
                        >
                          <UncontrolledDropdown>
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
                                  dropDown.apiFunction(item.id);
                                  dropDown.other && dropDown.other();
                                  dropDown.SetCourseId && dropDown.SetCourseId(item.courseId);
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
                })}
            </Table>
          </ModalBody>
        </Modal>
        <AddReplyCommentModal
          repShow={repComm}
          setRepShow={setRepComm}
          addReplyComment={AddReplayComment}
          ids={{ courseId: courseId, commentId: commentId }}
          refetch={refetch}
        />
      </div>
    </div>
  );
};
export default ReplaysCommentModal;
