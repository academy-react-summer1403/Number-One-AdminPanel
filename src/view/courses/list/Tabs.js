// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from "reactstrap";

// ** Icons Imports
import { User } from "react-feather";

const Tabs = ({ activeTab, toggleTab }) => {
  const tabsData = [
    { tabId: "1", title: "دوره های من" },
    { tabId: "2", title: "دوره های رزرو شده" },
    { tabId: "3", title: "پرداختی دوره ها" },
  ];

  return (
    <Nav pills className="mb-2">
      {tabsData.map((tab) => {
        return (
          <NavItem key={tab.tabId}>
            <NavLink
              active={activeTab === tab.tabId}
              onClick={() => toggleTab(tab.tabId)}
            >
              <User size={18} className="me-50" />
              <span className="fw-bold">{tab.title}</span>
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
};

export default Tabs;
