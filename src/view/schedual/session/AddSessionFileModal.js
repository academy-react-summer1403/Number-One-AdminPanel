import {
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import AddSessionNavItems from "../../../@core/constants/session/NavItems";
import { useState } from "react";

const AddSessionFileModal = ({ isOpen, toggle }) => {
  const [active, setActive] = useState("1");
  console.log(isOpen);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <Nav pills className="mb-2">
          {AddSessionNavItems.map((items, index) => (
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
          <TabPane tabId="1">uopload</TabPane>
          <TabPane tabId="2">url</TabPane>
        </TabContent>
      </ModalBody>
    </Modal>
  );
};

export default AddSessionFileModal;
