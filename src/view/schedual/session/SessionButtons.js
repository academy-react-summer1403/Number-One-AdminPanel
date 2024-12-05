import { Button, Col, Row } from "reactstrap";

const SessionButtons = ({
  data,
  toggleHW,
  toggleAddFileModal,
  toggleEdit,
  setId,
}) => {
  return (
    <>
      <Row className="py-1">
        <Col xs="12">
          <Button
            className="w-100"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              toggleAddFileModal();
            }}
          >
            افزودن فایل
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          <Button
            className="w-100"
            color="success"
            onClick={(e) => {
              e.preventDefault();
              toggleEdit();
            }}
          >
            ویرایش جلسه
          </Button>
        </Col>
        <Col xs="6">
          <Button
            className="w-100"
            color="warning"
            onClick={(e) => {
              e.preventDefault();
              setId(data?.scheduleSessionId);
              toggleHW();
            }}
          >
            تکلیف
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SessionButtons;
