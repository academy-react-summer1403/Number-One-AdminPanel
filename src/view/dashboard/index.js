import { Col, Row } from "reactstrap";
import CardCongratulations from "./CardCongratulations";
import StatsCard from "./StatsCard";

const Dashboard = () => {
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col lg="4" sm="12">
          <CardCongratulations />
        </Col>
        <Col lg="8" xs="12">
          <StatsCard/>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
