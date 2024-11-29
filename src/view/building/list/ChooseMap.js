import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const ChooseMap = ({ isOpen, toggle }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">انتخاب نشانی</h1>
        </div>
        <Row className="gy-1 pt-75">
          <Col xs={12} className="text-center mt-2 pt-50">
            <Button type="submit" className="me-1" color="primary">
              ثبت
            </Button>
            <Button type="reset" color="secondary" outline onClick={toggle}>
              لغو
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ChooseMap;
