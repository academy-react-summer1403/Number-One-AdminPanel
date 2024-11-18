import { Col, Row } from "reactstrap";
import CardCongratulations from "./CardCongratulations";
import StatsCard from "./StatsCard";
import { GoalOverViewData } from "../../@core/constants/dashboard";
import GoalOverview from "./GoalOverview";

const Dashboard = () => {
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col lg="4" sm="12">
          <CardCongratulations />
        </Col>
        <Col lg="8" xs="12">
          <StatsCard />
        </Col>
      </Row>
      <Row className="match-height">
        {GoalOverViewData.map((box, index) => (
          <Col lg="4" md="6" xs="12" key={index}>
            <GoalOverview
              variant={box.variant}
              texts={box.textsArray}
              // success={colors.success.main}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
