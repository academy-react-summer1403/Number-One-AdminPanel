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

// Custom Components
import GoalOverview from "../../../@core/components/goal-overview";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import CommentTab from "./CommentTab";

// ** Icons Imports
import { Heart, User, Users, Eye, MessageCircle } from "react-feather";
import { ThemeColors } from "@src/utility/context/ThemeColors";

// Api
import { GetRepliesComments } from "../../../@core/services/api/get-api";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import HandleIdentityEditorJs from "../../../utility/create-editorjs-blocks/IdentityEditorJs";

const NewsTabs = ({ active, toggleTab }) => {
  const { colors } = useContext(ThemeColors);
  const detail = useSelector((state) => state.NewsDetail);

  const StatsItems = [
    {
      label: "تعداد بازدید ها",
      icon: Eye,
      value: detail.newsDetails.currentView,
    },
    {
      label: "تعداد کامنت ها",
      icon: MessageCircle,
      value: detail.newsDetails.commentsCount,
    },
    {
      label: "تعداد دفعات ذخیره شدن",
      icon: Heart,
      value: detail.newsDetails.inUsersFavoriteCount,
    },
  ];

  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ["GET_REPLIES_COMMENT"],
    mutationFn: async (id) => {
      const response = await GetRepliesComments(id);
      return response;
    },
  });

  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">جزئیات</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <Row>
            <Col sm={5}>
              {StatsItems.map((item, index) => (
                <StatsHorizontal
                  key={index}
                  className={"mb-2"}
                  color="primary"
                  statTitle={item.label}
                  icon={<item.icon size={20} />}
                  renderStats={
                    <h3 className="fw-bolder mb-75">{item.value}</h3>
                  }
                />
              ))}
            </Col>
            <Col sm={7}>
              <GoalOverview
                success={colors.success.main}
                like={detail.newsDetails.currentLikeCount}
                disLike={detail.newsDetails.currentDissLikeCount}
              />
            </Col>
            <Col sm={12}>
              <Card>
                <CardHeader>
                  <div className="divider divider-start">
                    <div className="divider-text fs-2">توضیحات</div>
                  </div>
                </CardHeader>
                <CardBody>
                  <CardText tag="p">
                    <HandleIdentityEditorJs
                      desc={detail.newsDetails.describe}
                    />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <div className="divider divider-start">
            <div className="divider-text fs-2">کامنت ها</div>
          </div>
          <CommentTab
            newsCom={detail.newsComments}
            NewsRepById={mutate}
            repCom={isSuccess && data}
          />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default NewsTabs;
