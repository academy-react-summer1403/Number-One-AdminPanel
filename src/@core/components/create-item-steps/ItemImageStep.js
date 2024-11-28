import { useEffect, useState } from "react";
import { Camera } from "react-feather";
import { Button, Col, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import ButtonsForMove from "./ButtonsForMove";

const ItemImageStep = ({ stepper, handleFunc, section, preview }) => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!file) return;
    dispatch(handleFunc(file));
  }, [file]);

  return (
    <Row>
      <Col
        sm={6}
        className="d-flex justify-content-center flex-wrap my-auto"
        style={{ height: "fit-content" }}
      >
        <h1 className="w-100 text-center">عکس {section} را وارد کنید</h1>
        <input
          id="image1"
          type="file"
          style={{ display: "none" }}
          multiple
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <Button color="primary" className="my-2" style={{ padding: "0px" }}>
          <label
            htmlFor="image1"
            className="d-flex justify-content-center gap-75 p-1 cursor-pointer"
          >
            <span className="align-middle d-sm-inline-block d-none">
              افزودن عکس
            </span>
            <Camera size={16} />
          </label>
        </Button>
      </Col>
      <Col sm={6} style={{ height: "250px" }}>
        <div
          className="w-100 h-100 d-flex justify-content-center align-items-center border rounded"
          style={{ overflow: "hidden" }}
        >
          <img
            className="w-100 h-100 d-flex justify-content-center align-items-center"
            alt="عکسی آپلود نشده"
            src={preview}
          />
        </div>
      </Col>
      <Col sm={12}>
        <ButtonsForMove stepper={stepper} />
      </Col>
    </Row>
  );
};

export default ItemImageStep;
