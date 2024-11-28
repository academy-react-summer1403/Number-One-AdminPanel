import { Badge, Button, Col, Row } from "reactstrap";

import { useSelector } from "react-redux";

// Custom Component
import { UnitPrice } from "../../../../utility/separation-price";

// Api
import { CreateEvents } from "../../../../@core/services/api/post-api";

import CreateEditorJsBlocks from "../../../../utility/create-editorjs-blocks";
import { useMutation } from "@tanstack/react-query";

const EventPreview = ({ stepper }) => {
  const previewEvent = useSelector((state) => state.CreateEvent);

  const { mutate } = useMutation({
    mutationKey: ["CREATE_EVENT"],
    mutationFn: (values) => {
      let today = new Date();
      CreateEvents({ ...values, insertDate: today });
    },
  });

  return (
    <Row>
      <h1 className="w-100 text-center mb-4">پیش نمایش ایونت</h1>
      <Col xs={12}>
        <img
          className="img-fluid card-img-top w-100 rounded"
          style={{ height: "450px" }}
          src={previewEvent?.previewImage}
        />
      </Col>
      <Col xs={12} className="my-2 d-flex flex-wrap gap-1">
        <h3 className="w-100">{previewEvent?.title}</h3>
        <div className="w-100 d-flex justify-content-between">
          <div className="d-flex gap-2">
            <div>
              <span>تعداد دانشجو : </span>
              <span>{previewEvent?.students}</span>
            </div>
            <div>
              <span>تعداد صندلی : </span>
              <span>{previewEvent?.chairs}</span>
            </div>
          </div>
          <div>
            <span>تاریخ شروع : </span>
            <span>{previewEvent?.startEventTime}</span>
          </div>
        </div>
        <div className="w-100">
          <span>نشانی : </span>
          <span>{previewEvent?.address}</span>
        </div>
        <p className="mb-2 w-100">{previewEvent?.miniDescribe}</p>
      </Col>
      <Col xs={12}>
        <CreateEditorJsBlocks editorData={previewEvent?.describe} />
      </Col>
      <Col xs={12}>
        <h4 className="w-100 text-center">{UnitPrice(previewEvent?.price)} تومان</h4>
      </Col>
      <Col xs={12}>
        <Button
          className="w-100"
          color="primary"
          onClick={() => {
            mutate(previewEvent);
          }}
        >
          ساختن
        </Button>
      </Col>
    </Row>
  );
};

export default EventPreview;
