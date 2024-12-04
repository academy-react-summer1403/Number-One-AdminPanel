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
  const Tabs = [
    { icon: User, id: "1", title: "دوره ها" },
    { icon: BookOpen, id: "2", title: "دوره های رزرو" },
    { icon: Lock, id: "3", title: "کامنت ها" },
    { icon: Link, id: "4", title: "سایر اطاعات کاربر" },
  ];

  return (
    <Fragment>
      <Nav pills className="mb-2">
        {Tabs.map((item) => (
          <NavItem key={item.id}>
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
