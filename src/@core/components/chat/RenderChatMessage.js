import classNames from "classnames";
import React, { Fragment } from "react";
import Avatar from "@components/avatar";
import { useGetItem } from "../../../utility/hooks/useLocalStorage";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { UserDetails } from "../../services/api/get-api";

const RenderChatMessage = ({ chatRoom, userImage }) => {
  const id = useGetItem("id") && useGetItem("id");

  const { data: supporter } = useQueryWithDependencies(
    "GET_SUPPORTER_DETAILS",
    UserDetails,
    id,
    id
  );

  return (
    <Fragment>
      {chatRoom.map((msg, index) => (
        <div
          key={index}
          className={classNames("chat", {
            "chat-left": msg.sender !== "user",
          })}
        >
          <div className="chat-avatar">
            <Avatar
              imgWidth={36}
              imgHeight={36}
              className="box-shadow-1 cursor-pointer"
              img={
                msg.sender !== "user" ? supporter.currentPictureAddress : userImage
              }
            />
          </div>

          <div className="chat-body">
            <div className="chat-content">
              <p>{msg.text}</p>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default RenderChatMessage;
