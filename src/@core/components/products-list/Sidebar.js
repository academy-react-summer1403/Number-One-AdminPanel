import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

const Sidebar = ({ data, statisticsData, resize }) => {
  const [stats, setStats] = useState(undefined);

  useEffect(() => {
    if (data) {
      setStats(statisticsData(data));
    }
  }, [data]);

  return (
    <div
      className="app-user-list d-md-block !position-sticky"
      style={{ top: "0" }}
    >
      <Row>
        {stats &&
          stats.map((item, index) => (
            <Col md={resize} key={index}>
              <StatsHorizontal
                color={item.color}
                statTitle={item.title}
                icon={<item.icon size={20} />}
                renderStats={
                  <h3 className="fw-bolder mb-75">{item?.renderStats}</h3>
                }
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Sidebar;
