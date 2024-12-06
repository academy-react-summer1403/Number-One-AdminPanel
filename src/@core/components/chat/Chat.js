// ** React Imports
import { useState, useRef } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MessageSquare, Menu, Send } from "react-feather";

// ** Reactstrap Imports
import { Input, Button, InputGroup } from "reactstrap";
import RenderChatMessage from "./RenderChatMessage";
import AddAdminMessage from "../../services/api/put-api/AddAdminMessage";
import { handleMessage, handleSelectUser } from "../../../view/support/store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AddTeacherMessage } from "../../services/api/put-api";
import { useGetItem } from "../../../utility/hooks/useLocalStorage";

const ChatLog = () => {
  const SelectUser = useSelector((state) => state.SupportSlice.SelectUser);
  const chatArea = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = useGetItem("id");

  // Get Now Time
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  // ** State
  const [msg, setMsg] = useState("");

  // Handle Send Message For Admin
  const handleAdminSendMsg = async () => {
    if (msg == "") return;

    const res = await AddAdminMessage(SelectUser.id, {
      chatRoom: [
        ...SelectUser.chatRoom,
        {
          id: SelectUser.chatRoom.length + 1,
          text: msg,
          messageTime: time,
          sender: "admin"
        }
      ]
    });
    if (res) {
      setMsg("");
      dispatch(
        handleMessage({
          id: SelectUser.chatRoom.length + 1,
          text: msg,
          messageTime: time,
          sender: "admin"
        })
      );
    }
  };

  // Handle Send Message For Teacher
  const handleTeacherSendMsg = async () => {
    if (msg == "") return;

    const res = await AddTeacherMessage(SelectUser.id, {
      chatRoom: [
        ...SelectUser.chatRoom,
        {
          id: SelectUser.chatRoom.length + 1,
          text: msg,
          messageTime: time,
          sender: "admin",
          teacherId: id
        }
      ]
    });
    if (res) {
      setMsg("");
      dispatch(
        handleMessage({
          id: SelectUser.chatRoom.length + 1,
          text: msg,
          messageTime: time,
          sender: "admin",
          teacherId: id
        })
      );
    }
  };

  const handleSend = () => {
    if (location.pathname.toLocaleLowerCase() === "/supportadmin") {
      handleAdminSendMsg();
    } else {
      handleTeacherSendMsg();
    }
  };

  useEffect(() => {
    dispatch(handleSelectUser(0));
  }, [location]);

  return (
    <div className="chat-app-window h-100">
      <div
        className={classnames("start-chat-area", {
          "d-none": Object.keys(SelectUser).length
        })}
      >
        <div className="start-chat-icon mb-1">
          <MessageSquare />
        </div>
        <h4 className="sidebar-toggle start-chat-text">شروع مکالمه</h4>
      </div>
      {Object.keys(SelectUser).length ? (
        <div
          className={classnames("active-chat", {
            "d-none": SelectUser === null
          })}
        >
          <div className="chat-navbar">
            <header className="chat-header">
              <div className="d-flex align-items-center">
                <div className="sidebar-toggle d-block d-lg-none me-1">
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight="36"
                  imgWidth="36"
                  img={SelectUser.currentPictureAddress}
                  status="offline"
                  className="avatar-border user-profile-toggle m-0 me-1"
                />
                <h6 className="mb-0">
                  {SelectUser.fName} {SelectUser.lName}
                </h6>
              </div>
            </header>
          </div>

          <PerfectScrollbar
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}
            style={{ height: "480px" }}
          >
            {SelectUser.chatRoom ? (
              <div className="chats">
                <RenderChatMessage
                  chatRoom={SelectUser.chatRoom}
                  userImage={SelectUser.currentPictureAddress}
                />
              </div>
            ) : null}
          </PerfectScrollbar>
          <div className="d-flex">
            <InputGroup className="input-group-merge me-1 form-send-message">
              <Input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="متن خود را وارد کنید..."
              />
            </InputGroup>
            <Button onClick={handleSend} className="send" color="primary">
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">ارسال</span>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatLog;
