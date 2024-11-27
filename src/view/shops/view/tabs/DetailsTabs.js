// ** React Imports
import { Fragment, useContext, useEffect, useState } from "react";

// ** Reactstrap Imports
import {
  
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

// ** Icons Imports
import { CreditCard, FileText, Lock, User, Users } from "react-feather";

// ** Theme Colors
import { ThemeColors } from "../../../../utility/context/ThemeColors";
import { navShopTabs } from "../../../../@core/constants/shops/NavShopTabs";
import ProductsTab from "./ProductsTab";
import AdminUsersTab from "./AdminUsersTab";
// import AdminUsersTab from "../Tabs/AdminUsersTab";

const ShopTabs = ({ data, refetch }) => {
  //   const [stats, setStats] = useState(undefined);
  const { colors } = useContext(ThemeColors);
  //   Active Tab
  const [active, setActive] = useState("1");
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  //   useEffect(() => {
  //     if (data) {
  //       setStats(DetailsOfCourses(data));
  //     }
  //   }, [data]);

  return (
    <Fragment>
      <Nav pills className="mb-2">
        {navShopTabs.map((items, index) => (
          <NavItem key={index}>
            <NavLink
              active={active === items.id}
              onClick={() => toggleTab(items.id)}
            >
              <items.icon className="font-medium-3 me-50" />
              <span className="fw-bold">{items.text}</span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <ProductsTab courseId={data?.id}/>
        </TabPane>
        <TabPane tabId="2">
          <AdminUsersTab shopsData={data} refetch={refetch} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default ShopTabs;
