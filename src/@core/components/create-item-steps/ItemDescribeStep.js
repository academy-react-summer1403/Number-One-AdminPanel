import { Col, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import ButtonsForMove from "./ButtonsForMove";
import EditorComponent from "../editor-js";

const ItemDescribeStep = ({ stepper, handleFunc, section }) => {
  const dispatch = useDispatch();

  const handleSave = (data) => {
    if (data.blocks.length !== 0) {
      dispatch(handleFunc(JSON.stringify(data)));
      stepper.next();
    } else toast.error("لطفا متن پیام را وارد کنید");
  };

  return (
    <Row>
      <h1 className="w-100 text-center">توضیحات {section} را وارد کنید</h1>
      <Col sm="12" className="mb-2">
        <EditorComponent onSave={handleSave} />
      </Col>
      <Col xs={12}>
        <ButtonsForMove stepper={stepper} />
      </Col>
    </Row>
  );
};

export default ItemDescribeStep;
