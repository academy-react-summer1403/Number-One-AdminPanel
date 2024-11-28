import { useFormik } from "formik";
import { Col, Form, Input, Label, Row } from "reactstrap";

import { ButtonsForMove } from "../../../../@core/components/create-item-steps";
import { useDispatch } from "react-redux";
import { handleProductsInfo } from "../../store/CreateProducts";

// Api
import {
  GetProductCategoryList,
  GetShopList,
} from "../../../../@core/services/api/get-api";

// Query
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";

// Validations
import CreateProductsValidations from "../../../../@core/validations/CreateProducts.Validation";

const ProductInfo = ({ stepper }) => {
  const dispatch = useDispatch();

  const { data: shops, isSuccess: shopSuccess } = useQueryWithoutDependencies(
    "GET_SHOPS",
    GetShopList
  );

  const { data: categories, isSuccess: categorySuccess } =
    useQueryWithoutDependencies("GET_CATEGORIES", GetProductCategoryList);

  const initialValues = {
    title: "",
    categoryId: "",
    exist: 0,
    price: 0,
    special: "بله",
    isActive: true,
    shopId: "",
    discount: 0,
    miniDiscribe: "",
    googleDiscribe: "",
    googleTitle: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CreateProductsValidations,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(handleProductsInfo(values));
      stepper.next();
      setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col md="6" sm="12" className="">
          <Label className="form-label" for="title">
            عنوان محصول
          </Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="تیتر"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            invalid={formik.touched.title && !!formik.errors.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-danger">{formik.errors.title}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="googleTitle">
            عنوان گوگل
          </Label>
          <Input
            type="text"
            name="googleTitle"
            id="googleTitle"
            placeholder="لینک"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.googleTitle}
            invalid={formik.touched.googleTitle && !!formik.errors.googleTitle}
          />
          {formik.touched.googleTitle && formik.errors.googleTitle ? (
            <div className="text-danger">{formik.errors.googleTitle}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="shopId">
            فروشگاه
          </Label>
          <Input
            type="select"
            name="shopId"
            id="shopId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shopId}
            invalid={formik.touched.shopId && !!formik.errors.shopId}
          >
            <option value="">انتخاب کنید</option>
            {shopSuccess &&
              shops.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Input>
          {formik.touched.shopId && formik.errors.shopId ? (
            <div className="text-danger">{formik.errors.shopId}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="categoryId">
            دسته بندی
          </Label>
          <Input
            type="select"
            name="categoryId"
            id="categoryId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryId}
            invalid={formik.touched.categoryId && !!formik.errors.categoryId}
          >
            <option value="">انتخاب کنید</option>
            {categorySuccess &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
          </Input>
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className="text-danger">{formik.errors.categoryId}</div>
          ) : null}
        </Col>
        <Col md="2" sm="12" className="mb-1">
          <Label className="form-label" for="special">
            فروش ویژه
          </Label>
          <Input
            type="select"
            name="special"
            id="special"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.special}
            invalid={formik.touched.special && !!formik.errors.special}
          >
            <option value="بله">بله</option>
            <option value="خیر">خیر</option>
          </Input>
        </Col>
        <Col md="2" sm="12" className="mb-1">
          <Label className="form-label" for="exist">
            مجودی انبار
          </Label>
          <Input
            type="text"
            name="exist"
            id="exist"
            placeholder="مجودی انبار"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.exist}
            invalid={formik.touched.exist && !!formik.errors.exist}
          />
          {formik.touched.exist && formik.errors.exist ? (
            <div className="text-danger">{formik.errors.exist}</div>
          ) : null}
        </Col>
        <Col md="2" sm="12" className="mb-1">
          <Label className="form-label" for="discount">
            تخفیف
          </Label>
          <Input
            type="text"
            name="discount"
            id="discount"
            placeholder="تخفیف"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discount}
            invalid={formik.touched.discount && !!formik.errors.discount}
          />
          {formik.touched.discount && formik.errors.discount ? (
            <div className="text-danger">{formik.errors.discount}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="price">
            قیمت
          </Label>
          <Input
            type="text"
            name="price"
            id="price"
            placeholder="تخفیف"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            invalid={formik.touched.price && !!formik.errors.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-danger">{formik.errors.price}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="googleDiscribe">
            توضیحات گوگل
          </Label>
          <Input
            type="textarea"
            name="googleDiscribe"
            id="googleDiscribe"
            placeholder="توضیحات"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.googleDiscribe}
            invalid={
              formik.touched.googleDiscribe && !!formik.errors.googleDiscribe
            }
          />
          {formik.touched.googleDiscribe && formik.errors.googleDiscribe ? (
            <div className="text-danger">{formik.errors.googleDiscribe}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="miniDiscribe">
            توضیح کوتاه
          </Label>
          <Input
            type="textarea"
            name="miniDiscribe"
            id="miniDiscribe"
            placeholder="توضیحات"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.miniDiscribe}
            invalid={
              formik.touched.miniDiscribe && !!formik.errors.miniDiscribe
            }
          />
          {formik.touched.miniDiscribe && formik.errors.miniDiscribe ? (
            <div className="text-danger">{formik.errors.miniDiscribe}</div>
          ) : null}
        </Col>
        <Col xs={12}>
          <ButtonsForMove stepper={stepper} form={false} />
        </Col>
      </Row>
    </Form>
  );
};

export default ProductInfo;
