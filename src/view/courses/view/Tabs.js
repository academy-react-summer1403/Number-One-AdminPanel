// ** React Imports
import { Fragment, useContext, useEffect, useState } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

// ** Icons Imports
import { CreditCard, FileText, Lock, User, Users } from "react-feather";

// ** User Components
import CoursesGroups from "../courseGroups/TableGr";
import CourseCom from "../courseGroups/comment/Comment";
import UsersCourses from "../userCorses/Table";
import Payments from "../payment/payments";
import { DetailsOfCourses, navItems } from "../../../../core/constans/courses";
import StatsHorizontal from "../../widgets/stats/StatsHorizontal";
import GoalOverview from "./GoalOverview";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import CreateTitle from "../../user/view/CreateTitle";
import CourseUsers from "../userCorses/Table";

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
                  <CreateTitle className={"w-100 mt-1 d-flex mb-2"}>
                    توضیحات
                  </CreateTitle>
                </CardHeader>
                <CardBody>
                  <CardText tag="p">{data?.describe}</CardText>
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
          <CoursesGroups
            groupData={groupData}
            refetchGroup={refetchGroup}
          />
        </TabPane>
        <TabPane tabId="5">
          <Payments />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
