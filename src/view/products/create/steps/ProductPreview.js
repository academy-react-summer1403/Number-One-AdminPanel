import { Badge, Button, Col, Row } from "reactstrap";

import { useSelector } from "react-redux";

// Custom Component
import { ButtonsForMove } from "../../../../@core/components/create-item-steps";

// Api
import { CreateProducts } from "../../../../@core/services/api/post-api";

import CreateEditorJsBlocks from "../../../../utility/create-editorjs-blocks";
import { useMutation } from "@tanstack/react-query";

const ProductPreview = ({ stepper }) => {
  const previewProduct = useSelector((state) => state.CreateProductsSlice);
console.log(previewProduct)
  const { mutate } = useMutation({
    mutationKey: ["CREATE_PRODUCTS"],
    mutationFn: (values) => {
      let today = new Date();
      CreateProducts({ ...values, insertDate: today });
    },
  });

  return (
    <Row>
      <h1 className="w-100 text-center mb-4">پیش نمایش محصول</h1>
      <Col xs={12}>
        <img
          className="img-fluid card-img-top w-100 rounded"
          style={{ height: "450px" }}
          src={previewProduct.previewImage}
        />
      </Col>
      <Col xs={12} className="my-2 d-flex flex-wrap gap-1">
        <h3 className="w-100">{previewProduct?.title}</h3>

        <Badge color="light-primary" pill>
          {previewProduct.categoryId}
        </Badge>
        <Badge color="light-primary" pill>
          {previewProduct.shopId}
        </Badge>

        <p className="mb-2">{previewProduct?.miniDiscribe}</p>
      </Col>
      <Col xs={12}>
        <CreateEditorJsBlocks editorData={previewProduct?.discribe} />
        <Button
          onClick={() => {
            mutate(previewProduct);
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

export default ProductPreview;
