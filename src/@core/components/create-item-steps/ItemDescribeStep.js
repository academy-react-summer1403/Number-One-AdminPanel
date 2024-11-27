import { Button, Col, Row } from "reactstrap";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import ButtonsForMove from "./ButtonsForMove";

const ItemDescribeStep = ({ stepper, handleFunc, section }) => {
  const editorHolderRef = useRef();

  const editor =
    editorHolderRef?.current &&
    new EditorJS({
      holder: editorHolderRef.current.id,
      tools: {
        header: {
          class: Header,
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        quote: {
          class: Quote,
          config: {
            quotePlaceholder: "متن",
            captionPlaceholder: "کپشن",
          },
        },
      },
    });

  const dispatch = useDispatch();

  return (
    <Row>
      <h1 className="w-100 text-center">توضیحات {section} را وارد کنید</h1>
      <Col sm="12" className="mb-2">
        <div ref={editorHolderRef} id="Describe"></div>
      </Col>
      <Col xs={12}>
        <Button
          onClick={() => {
            editor
              .save()
              .then((outputData) => {
                console.log(outputData)
                dispatch(handleFunc(JSON.stringify(outputData)));
              })
              .catch((error) => {
                console.log("Saving failed: ", error);
              });
          }}
        >
          ثبت
        </Button>
      </Col>
      <Col xs={12}>
        <ButtonsForMove stepper={stepper} />
      </Col>
    </Row>
  );
};

export default ItemDescribeStep;
