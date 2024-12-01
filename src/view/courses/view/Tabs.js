// ** React Imports
import { Fragment, useContext, useEffect, useState } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

// ** User Components
// import CoursesGroups from "../courseGroups/TableGr";
// import Payments from "../payment/payments";
import StatsHorizontal from "../../../@core/components/widgets/stats//StatsHorizontal";
import { ThemeColors } from "../../../utility/context/ThemeColors";
// import CourseUsers from "../userCorses/Table";
import { DetailsOfCourses, navItems } from "../../../@core/constants/courses";
import GoalOverview from "./GoalOverview";
import HandleIdentityEditorJs from "../../../utility/create-editorjs-blocks/IdentityEditorJs";
import CourseCom from "./tabs/Comment";
import CourseUsers from "./tabs/UsersCourses";
import CoursesGroups from "./tabs/GroupsCourses";
import Payments from "./tabs/payments";
import CourseAssistance from "./tabs/CourseAssistance";

const UserTabs = ({
  active,
  toggleTab,
  data,
  centeredModal,
  setCenteredModal,
  setUserSel,
  refetchChange,
  refetchGroup,
  groupData,
}) => {
  const [stats, setStats] = useState(undefined);
  const { colors } = useContext(ThemeColors);

  useEffect(() => {
    if (data) {
      setStats(DetailsOfCourses(data));
    }
  }, [data]);

  return (
    <Fragment>
      <Nav pills className="mb-2">
        {navItems.map((items, index) => (
          <NavItem key={index}>
            <NavLink
              active={active === items.id}
              onClick={() => toggleTab(items.id)}
            >
              <items.icon className="font-medium-3 me-50" />
              <span className="fw-bold">{items.text}</span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <Row>
            <Col sm={5}>
              {stats?.map((item, index) => (
                <StatsHorizontal
                  key={index}
                  className={"mb-2"}
                  color={item.color}
                  statTitle={item.title}
                  icon={<item.icon size={20} />}
                  renderStats={
                    <h3 className="fw-bolder mb-75">{item.renderStats}</h3>
                  }
                />
              ))}
            </Col>
            <Col sm={7}>
              <GoalOverview
                success={colors.success.main}
                paymentDone={data?.paymentDoneTotal}
                paymentNotDone={data?.paymentNotDoneTotal}
              />
            </Col>
            <Col sm={12}>
              <Card>
                <CardHeader>
                  <div className="divider-text fs-2">جزئیات</div>
                </CardHeader>
                <CardBody>
                  <HandleIdentityEditorJs desc={data?.describe} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <CourseCom />
        </TabPane>
        <TabPane tabId="3">
          <CourseUsers
            centeredModal={centeredModal}
            setCenteredModal={setCenteredModal}
            setUserSel={setUserSel}
            refetchChange={refetchChange}
          />
        </TabPane>
        <TabPane tabId="4">
          <CoursesGroups groupData={groupData} refetchGroup={refetchGroup} />
        </TabPane>
        <TabPane tabId="5">
          <Payments />
        </TabPane>
        <TabPane tabId="6">
          <CourseAssistance id={data?.courseId} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
