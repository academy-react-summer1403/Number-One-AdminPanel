import { Fragment, useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { User, Lock, Link, BookOpen, Table } from "react-feather";

// Tabs Components
import UserCourseList from "./UserCourseList";
import UserReserveCourse from "./UserReserveCourse";
import MoreInfo from "./MoreInfo";
import Connections from "./Connections";
import UserComments from "./UserComments";

const UserTabs = ({ active, toggleTab, userDetails }) => {
  const [isTeacher, steIsTeacher] = useState(false);

  useEffect(() => {
    let exist = userDetails?.roles?.find((ev) => ev.roleName == "Teacher");
    if (exist) {
      steIsTeacher(true);
    } else {
      steIsTeacher(false);
    }
  }, [userDetails]);

  const Tabs = [
    { icon: User, id: "1", title: "دوره ها", show: true },
    { icon: BookOpen, id: "2", title: "دوره های رزرو", show: true },
    { icon: Lock, id: "3", title: "کامنت ها", show: true },
    { icon: Link, id: "4", title: "سایر اطاعات کاربر", show: true },
    { icon: Table, id: "5", title: "دوره های این معلم", show: isTeacher },
  ];

  return (
    <Fragment>
      <Nav pills className="mb-2">
        {Tabs.map((item) => (
          <NavItem key={item.id} className={!item.show && "d-none"}>
            <NavLink
              active={active === item.id}
              onClick={() => toggleTab(item.id)}
              className="px-1"
            >
              <item.icon className="font-medium-3 me-50" />
              <span className="fw-bold">{item.title}</span>
            </NavLink>
          </NavItem>
        ))}
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
