import { Badge, Button, Col, Row } from "reactstrap";

import { useSelector } from "react-redux";

// Custom Component
import { ButtonsForMove } from "../../../../@core/components/create-item-steps";

// Api
import {CreateShop } from "../../../../@core/services/api/post-api";

import CreateEditorJsBlocks from "../../../../utility/create-editorjs-blocks";
import { useMutation } from "@tanstack/react-query";

const ShopPreview = ({ stepper }) => {
  const previewShop = useSelector((state) => state.CreateShopsSlice);
  // console.log(previewShop)

  const { mutate } = useMutation({
    mutationKey: ["CREATE_SHOPS"],
    mutationFn: (values) => {
      console.log(values)
      CreateShop(values);
    },
  });

  return (
    <Row>
      <h1 className="w-100 text-center mb-4">پیش نمایش فروشگاه</h1>
      <Col xs={12}>
        <img
          className="img-fluid card-img-top w-100 rounded"
          style={{ height: "450px" }}
          src={previewShop?.img}
        />
      </Col>
      <Col xs={12} className="my-2 d-flex flex-wrap gap-1">
        <h3 className="w-100">{previewShop?.title}</h3>

        <Badge color="light-primary" pill>
          {previewShop?.categoryId}
        </Badge>
        <Badge color="light-primary" pill>
          {previewShop?.rate}
        </Badge>
        <Badge color="light-primary" pill>
          {previewShop?.startTime}
        </Badge>
        <Badge color="light-primary" pill>
          {previewShop?.endTime}
        </Badge>

        <p className="mb-2">{previewShop?.address}</p>
      </Col>
      <Col xs={12}>
        <CreateEditorJsBlocks editorData={previewShop?.aboutUs} />
        <Button
          onClick={() => {
            mutate(previewShop);
          }}
        >
          Create
        </Button>
      </Col>
      <Col xs={12}>
        <ButtonsForMove stepper={stepper} />
      </Col>
    </Row>
  );
};

export default ShopPreview;
