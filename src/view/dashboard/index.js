import { Col, Row } from "reactstrap";
import CardCongratulations from "./CardCongratulations";
import StatsCard from "./StatsCard";
import { GoalOverViewData } from "../../@core/constants/dashboard";
import GoalOverview from "./GoalOverview";
import { useContext } from "react";
import { ThemeColors } from "../../utility/context/ThemeColors";
import Sales from "./Sales";
import RevenueReport from "./RevenueReport";
import ChartjsPolarAreaChart from "./ChartjsPolarAreaChart";
import Earnings from "./Earnings";
import CartWithLine from "./CartWithLine";

const Dashboard = () => {
  // ** ThemeColors
  const { colors } = useContext(ThemeColors);
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col lg="4" sm="12">
          <Col sm="12">
            <CardCongratulations />
          </Col>
          <Col sm="12">
            <Earnings />
          </Col>
        </Col>
        <Col lg="8" xs="12">
          <StatsCard />
        </Col>
        <Col xs="12">
          <CartWithLine />
        </Col>
      </Row>
      <Row className="match-height">
        {GoalOverViewData.map((box, index) => (
          <Col lg="4" md="6" xs="12" key={index}>
            <GoalOverview
              variant={box.variant}
              texts={box.textsArray}
              success={colors.success.main}
            />
          </Col>
        ))}
        <Col lg="4" md="6" xs="12">
          <Sales primary={colors.primary.main} info={colors.info.main} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="6" xs="12">
          <RevenueReport
            primary={colors.primary.main}
            warning={colors.warning.main}
          />
        </Col>
        <Col lg="6" sm="12">
          <ChartjsPolarAreaChart
            greyColor={"#4F5D70"}
            labelColor={"#b4b7bd"}
            primary={colors.primary.main}
            infoColorShade={"#299AFF"}
            warningColorShade={"#ffbd1f"}
            successColorShade={"#28dac6"}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
