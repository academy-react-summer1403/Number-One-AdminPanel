import { Col } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

const Reports = ({ reports }) => {
  return reports?.map((item, index) => (
    <Col key={index} lg="4" sm="6">
      <StatsHorizontal
        color={item.color}
        statTitle={item.title}
        icon={<item.icon size={20} />}
        renderStats={<h3 className="fw-bolder mb-75">{item.stats}</h3>}
      />
    </Col>
  ));
};

export default Reports;
