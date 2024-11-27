import { Badge, Button, Col, Row } from "reactstrap";

import { useSelector } from "react-redux";

// Custom Component
import { ButtonsForMove } from "../../../../@core/components/create-item-steps";

// Api
import { CreateShop } from "../../../../@core/services/api/post-api";

import CreateEditorJsBlocks from "../../../../utility/create-editorjs-blocks";
import { useMutation } from "@tanstack/react-query";
import { useQueryWithDependencies } from "../../../../utility/hooks/useCustomQuery";
import GetShopCategory from "../../../../@core/services/api/get-api/GetShopCategory";

const ShopPreview = ({ stepper }) => {
  const previewShop = useSelector((state) => state.CreateShopsSlice);
  // console.log(previewShop)

  const { mutate } = useMutation({
    mutationKey: ["CREATE_SHOPS"],
    mutationFn: (values) => {
      console.log(values);
      CreateShop(values);
    },
  });
  // Get Category For Shop
  const { data, isSuccess } = useQueryWithDependencies(
    "GET_SHOP_CATEGORY",
    GetShopCategory,
    previewShop?.categoryId,
    Number(previewShop?.categoryId)
  );
  // console.log(previewShop?.categoryId);
  // console.log(data?.categoryName);

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
      <Col xs={12} className=" d-flex flex-wrap  gap-1">
        <span> نام فروشگاه:</span>
        <h3 className="w-100">{previewShop?.name}</h3>

        <span>دسته بندی:</span>
          {data?.categoryName}
        <span> امتیاز:</span>
          {previewShop?.rate}
        <span> زمان شروع ارسال:</span>
          {previewShop?.startTime}
        <span> زمان پایان ارسال:</span>
          {previewShop?.endTime}
        <span> آدرس:</span>
        <p className="mb-2">{previewShop?.address}</p>
      </Col>
      <Col xs={12}>
        <span> درباره فروشگاه:</span>
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
