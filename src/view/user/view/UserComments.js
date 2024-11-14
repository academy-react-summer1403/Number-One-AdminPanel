import { useSelector } from "react-redux";
import { Badge } from "reactstrap";
import { GetUserComments } from "../../../@core/services/api/get-api";
import {
  AcceptUserComment,
  RejectUserComment,
} from "../../../@core/services/api/post-api";
import { DeleteUserComment } from "../../../@core/services/api/delete-api";
import { useMutation } from "@tanstack/react-query";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { CheckCircle, Slash, Trash } from "react-feather";
import UserActiveComments from "./UserActiveComments";
import UserNotActiveComments from "./UserNotActiveComments";

const UserComments = ({ section }) => {
  const id = useSelector((state) => state.UserInfoSlice.details.id);
  const headerItems = ["عنوان کامنت", "متن کامنت", "وضعیت", "اقدام"];

  const { data, refetch } = useQueryWithDependencies(
    "GET_USER_COMMENTS",
    GetUserComments,
    id,
    id
  );

  const { mutate: handleAcceptComment } = useMutation({
    mutationKey: ["ACCEPT_COMMENT"],
    mutationFn: (id) => {
      AcceptUserComment(id, refetch);
    },
  });

  const { mutate: handleRejectComment } = useMutation({
    mutationKey: ["REJECT_COMMENT"],
    mutationFn: (id) => {
      RejectUserComment(id, refetch);
    },
  });

  const { mutate: handleDeleteComment } = useMutation({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: (id) => {
      DeleteUserComment(id, refetch);
    },
  });

  const columns = [
    {
      sortable: true,
      maxWidth: "250px",
      name: "عنوان کامنت",
      selector: (row) => row.commentTitle,
      cell: (row) => {
        return (
          <span className="text-truncate fw-bolder">{row.commentTitle}</span>
        );
      },
    },
    {
      name: "متن کامنت",
      maxWidth: "300px",
      selector: (row) => row.describe,
    },
    {
      name: "وضعیت",
      maxWidth: "100px",
      selector: (row) => (
        <Badge
          pill
          color={row.accept ? "light-primary" : "light-danger"}
          className="me-1"
        >
          {row.accept === true ? "تایید شده" : " تایید نشده"}
        </Badge>
      ),
    },
    {
      name: "اقدام",
      maxWidth: "80px",
      selector: (row) => (
        <div className="d-flex gap-75">
          {section === "Active" ? (
            <Slash
              className="cursor-pointer"
              size={20}
              onClick={() => {
                section === "Active"
                  ? handleRejectComment(row.commentId)
                  : handleAcceptComment(row.commentId);
              }}
            />
          ) : (
            <CheckCircle
              className="cursor-pointer"
              size={20}
              onClick={() => {
                section === "Active"
                  ? handleRejectComment(row.commentId)
                  : handleAcceptComment(row.commentId);
              }}
            />
          )}
          <Trash
            className="cursor-pointer"
            size={20}
            onClick={() => {
              handleDeleteComment(row.commentId);
            }}
          />
        </div>
      ),
    },
  ];

  // Render Component
  if (section === "Active")
    return (
      <UserActiveComments
        columns={columns}
        headerItems={headerItems}
        data={data?.comments?.filter((item) => item.accept == true)}
      />
    );
  else
    return (
      <UserNotActiveComments
        columns={columns}
        headerItems={headerItems}
        data={data?.comments?.filter((item) => item.accept == false)}
      />
    );
};

export default UserComments;
