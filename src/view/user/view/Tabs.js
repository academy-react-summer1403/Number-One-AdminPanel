import { Fragment } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { User, Lock, Link } from "react-feather";

// Tabs Components
import UserCourseList from "./UserCourseList";
import UserReserveCourse from "./UserReserveCourse";
import MoreInfo from "./MoreInfo";
import Connections from "./Connections";
import UserActiveComments from "./UserActiveComments";
import UserComments from "./UserComments";

const UserTabs = ({ active, toggleTab }) => {
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
          <UserCourseList />
        </TabPane>
        <TabPane tabId="2">
          <UserReserveCourse />
        </TabPane>
        <TabPane tabId="3">
          <UserComments section="Active" />
          <UserComments section="notActive" />
        </TabPane>
        <TabPane tabId="4" className="mb-4">
          <MoreInfo />
          <Connections />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default UserTabs;
