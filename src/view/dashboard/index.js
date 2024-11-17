import { Col, Row } from "reactstrap";
import CardCongratulations from "./CardCongratulations";

const Dashboard = () => {
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col lg="4" sm="12">
          <CardCongratulations />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
