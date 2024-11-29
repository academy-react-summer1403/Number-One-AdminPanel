import { Activity, Globe, Slash } from "react-feather";
import { Col } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

const Reports = ({ data }) => {
  const reports = [
    {
      title: "کل ساختمان ها",
      color: "primary",
      stats: data?.length,
      icon: Globe,
    },
    {
      title: "ساختمان های فعال",
      color: "success",
      stats: data?.filter((item) => item.active)?.length,
      icon: Activity,
    },
    {
      title: "ساختمان های غیر فعال",
      color: "warning",
      stats: data?.filter((item) => !item.active)?.length,
      icon: Slash,
    },
  ];

  return reports.map((item, index) => (
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
