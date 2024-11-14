import { Fragment } from "react";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

const Sidebar = ({ states }) => {
  return (
    <Fragment>
      {states?.map((item, index) => (
        <StatsHorizontal
          key={index}
          color="primary"
          statTitle={item.label}
          icon={<item.icon size={20} />}
          renderStats={<h3 className="fw-bolder mb-75">{item.value}</h3>}
        />
      ))}
    </Fragment>
  );
};

export default Sidebar;
