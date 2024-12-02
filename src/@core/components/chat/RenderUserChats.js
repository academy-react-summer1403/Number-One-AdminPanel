import { Fragment, useEffect, useState } from "react";
import {
  GetUserChatInAdmin,
  GetUserChatInTeacher,
  UserDetails,
} from "../../services/api/get-api";
import { useQueryWithoutDependencies } from "../../../utility/hooks/useCustomQuery";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Avatar from "@components/avatar";
import { CardText } from "reactstrap";
import {
  handleAdminUserList,
  handleData,
  handleSelectUser,
  handleTeacherUserList,
} from "../../../view/support/store";
import { useLocation } from "react-router-dom";
import { useGetItem } from "../../../utility/hooks/useLocalStorage";

const RenderUserChats = () => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const params = useSelector((state) => state.SupportSlice);
  const location = useLocation();
  const id = useGetItem("id") && useGetItem("id");

  // Get Admin Chat
  const { data: adminChats, isSuccess: adminSuccess } =
    useQueryWithoutDependencies("GET_ADMIN_CHAT", GetUserChatInAdmin);

  // Get Teacher Chat
  const { data: teacherChats, isSuccess: teacherSuccess } =
    useQueryWithoutDependencies("GET_TEACHER_CHAT", GetUserChatInTeacher);

  // Get User Details
  const { mutate } = useMutation({
    mutationKey: ["GET_USER_DETAILS"],
    mutationFn: async (id) => {
      let user = await UserDetails(id);
      if (location.pathname.toLocaleLowerCase() === "/supportadmin") {
        dispatch(handleAdminUserList(user));
      } else {
        dispatch(handleTeacherUserList(user));
      }
    },
  });

  // Get User Info That Chat With Admin
  const GetUserInfoFromAdminChats = () => {
    for (const ev of adminChats) {
      mutate(ev.userId);
    }
  };

  // Get User Info That Chat With Teacher
  const GetUserInfoFromTeacherChats = () => {
    for (const ev of teacherChats) {
      let existChatForThisTeacher = ev.chatRoom.find(
        (chat) => chat.teacherId === id
      );
      if (existChatForThisTeacher) {
        mutate(ev.userId);
      }
    }
  };

  // Get User Info That chat with admin
  const GetUserChatInfo = (id, variant) => {
    if (location.pathname.toLocaleLowerCase() === "/supportadmin") {
      const userChatRoom = adminChats?.find((user) => user.userId === id);

      return userChatRoom?.chatRoom[userChatRoom?.chatRoom?.length - 1]?.[
        variant
      ];
    } else if (location.pathname.toLocaleLowerCase() === "/supportteacher") {
      const userChatRoom = teacherChats?.find((user) => user.userId === id);

      return userChatRoom?.chatRoom[userChatRoom?.chatRoom?.length - 1]?.[
        variant
      ];
    }
  };

  useEffect(() => {
    if (
      location.pathname.toLocaleLowerCase() === "/supportadmin" &&
      adminSuccess
    ) {
      dispatch(handleData(adminChats));
      GetUserInfoFromAdminChats();
    } else if (
      location.pathname.toLocaleLowerCase() === "/supportteacher" &&
      teacherSuccess
    ) {
      dispatch(handleData(teacherChats));
      GetUserInfoFromTeacherChats();
    }
  }, [adminSuccess, teacherSuccess, location]);

  // When Clicking user
  const handleUserClick = (id) => {
    dispatch(handleSelectUser(id));
    setActive(id);
  };

  return (
    <Fragment>
      {params.FilteredData?.map((item, index) => (
        <li
          key={index}
          onClick={() => handleUserClick(item.id)}
          className={classNames({
            active: active === item.id,
          })}
        >
          <Avatar
            img={item.currentPictureAddress}
            imgHeight="42"
            imgWidth="42"
            status={item.status}
          />
          <div className="chat-info flex-grow-1">
            <h5 className="mb-0">
              {item.fName} {item.lName}
            </h5>
            <CardText className="text-truncate">
              {GetUserChatInfo(item.id, "text")}
            </CardText>
          </div>
          <div className="chat-meta text-nowrap">
            <small className="float-end mb-25 chat-time ms-25">
              {GetUserChatInfo(item.id, "messageTime")}
            </small>
          </div>
        </li>
      ))}
    </Fragment>
  );
};

export default RenderUserChats;
