import { Fragment, useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { User, Lock, Link } from "react-feather";

// Tabs Components
import UserCourseList from "./UserCourseList";
import UserReserveCourse from "./UserReserveCourse";
import MoreInfo from "./MoreInfo";
import Connections from "./Connections";

// Api
import { GetUserComments } from "../../../@core/services/api/get-api";
import {
  AcceptUserComment,
  RejectUserComment,
} from "../../../@core/services/api/post-api";
import { DeleteUserComment } from "../../../@core/services/api/delete-api";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

// import CourseCom from "../../DetailCourse/courseGroups/comment/Comment";

const UserTabs = ({ active, toggleTab }) => {
  const id = useSelector((state) => state.UserInfoSlice.details.id);
  const [acceptComment, setAcceptComment] = useState([]);
  const [notAcceptComment, setNotAcceptComment] = useState([]);

  const { data, isSuccess, refetch, isRefetching } = useQueryWithDependencies(
    "GET_USER_COMMENTS",
    GetUserComments,
    id,
    id
  );

  const { mutate: handleAcceptComment } = useMutation({
    mutationKey: ["ACCEPT_COMMENT"],
    mutationFn: (id) => {
      AcceptUserComment(id);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: handleRejectComment } = useMutation({
    mutationKey: ["REJECT_COMMENT"],
    mutationFn: (id) => {
      RejectUserComment(id);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: handleDeleteComment } = useMutation({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: (id) => {
      DeleteUserComment(id);
    },
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    setAcceptComment(data?.comments?.filter((item) => item.accept == true));
    setNotAcceptComment(data?.comments?.filter((item) => item.accept == false));
  }, [isSuccess, isRefetching]);

  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => toggleTab("1")}
            className="px-1"
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => toggleTab("2")}
            className="px-1"
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => toggleTab("3")}
            className="px-1"
          >
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "4"}
            onClick={() => toggleTab("4")}
            className="px-1"
          >
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">سایر اطاعات کاربر</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <div className="divider divider-start">
            <div className="divider-text">دوره های تایید شده</div>
          </div>
          <UserCourseList />
        </TabPane>
        <TabPane tabId="2">
          <div className="divider divider-start">
            <div className="divider-text">دوره های رزرو شده</div>
          </div>
          <UserReserveCourse />
        </TabPane>
        <TabPane tabId="3">
          <div className="divider divider-start">
            <div className="divider-text">کامنت های تایید شده</div>
          </div>
          {/* <CourseCom
            comments={acceptComment}
            title="نام دوره"
            acceptFunction={handleAcceptComment}
            rejectFunction={handleRejectComment}
            deleteFunction={handleDeleteComment}
          /> */}
          <div className="divider divider-start">
            <div className="divider-text">کامنت های تایید نشده</div>
          </div>
          {/* <CourseCom
            comments={notAcceptComment}
            title="نام دوره"
            acceptFunction={handleAcceptComment}
            rejectFunction={handleRejectComment}
            deleteFunction={handleDeleteComment}
          /> */}
        </TabPane>
        <TabPane tabId="4" className="mb-4">
          <div className="divider divider-start">
            <div className="divider-text">سایر اطاعات کاربر</div>
          </div>
          <MoreInfo />
          <div className="divider divider-start">
            <div className="divider-text">شبکه های اجتماعی</div>
          </div>
          <Connections />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default UserTabs;
