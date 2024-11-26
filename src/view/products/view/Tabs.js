// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

// ** Icons Imports
import { User, Users } from "react-feather";

// Customize
import HandleIdentityEditorJs from "../../../utility/create-editorjs-blocks/IdentityEditorJs";
import EditSliders from "./EditSliders";

const ProductsTabs = ({ active, toggleTab, details, refetch }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">توضیحات</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">ویرایش اسلایدر</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <Card>
            <CardHeader>
              <div className="divider divider-start">
                <div className="divider-text fs-2">توضیحات</div>
              </div>
            </CardHeader>
            <CardBody>
              <HandleIdentityEditorJs desc={details.discribe} />
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          <EditSliders
            images={details.pictureList}
            id={details.id}
            refetch={refetch}
          />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default ProductsTabs;
