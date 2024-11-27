import { useFormik } from "formik";

import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";

import { handleShopsInfo } from "../../store/CreateShop";
import EditShopValidation from "../../../../@core/validations/EditShop_Validation";
import { ButtonsForMove } from "../../../../@core/components/create-item-steps";
import { useDispatch } from "react-redux";
import { useGetItem } from "../../../../utility/hooks/useLocalStorage";

const AddShop = ({ stepper }) => {
  const dispatch = useDispatch();
  const adminId = useGetItem("id")

  const initialValues = {
    name: "",
    categoryId: "",
    rate: "",
    address: "",
    startTime: "",
    endTime: "",
    isActive: true,
    permissionIds: [String(adminId)],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: EditShopValidation,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(handleShopsInfo(values));
      console.log(values);
      stepper.next();
      setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="name">
            عنوان فروشگاه
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="نام فروشگاه"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            invalid={formik.touched.name && !!formik.errors.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="address">
            آدرس فروشگاه
          </Label>
          <Input
            type="string"
            name="address"
            id="address"
            placeholder="آدرس"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            invalid={formik.touched.address && !!formik.errors.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-danger">{formik.errors.address}</div>
          ) : null}
        </Col>
        <Col sm="6" className="mb-1">
          <Label className="form-label" for="categoryId">
            دسته بندی
          </Label>
          <Input
            type="string"
            name="categoryId"
            id="category"
            placeholder="دسته بندی"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryId}
            invalid={formik.touched.categoryId && !!formik.errors.categoryId}
          />
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className="text-danger">{formik.errors.categoryId}</div>
          ) : null}
        </Col>
        <Col sm="6" className="mb-1">
          <Label className="form-label" for="rate">
            امتیاز فروشگاه
          </Label>
          <Input
            type="number"
            name="rate"
            id="rate"
            placeholder="امتیاز"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rate}
            invalid={formik.touched.rate && !!formik.errors.rate}
          />
          {formik.touched.rate && formik.errors.rate ? (
            <div className="text-danger">{formik.errors.rate}</div>
          ) : null}
        </Col>
        <Col sm="6" className="mb-1">
          <Label className="form-label" for="startTime">
            زمان شروع ارسال
          </Label>
          <Input
            type="number"
            name="startTime"
            id="startTime"
            placeholder="زمان شروع"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startTime}
            invalid={formik.touched.startTime && !!formik.errors.startTime}
          />
          {formik.touched.startTime && formik.errors.startTime ? (
            <div className="text-danger">{formik.errors.startTime}</div>
          ) : null}
        </Col>
        <Col sm="6" className="mb-1">
          <Label className="form-label" for="endTime">
            زمان پایان ارسال
          </Label>
          <Input
            type="number"
            name="endTime"
            id="endTime"
            placeholder="زمان پایان"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endTime}
            invalid={formik.touched.endTime && !!formik.errors.endTime}
          />
          {formik.touched.endTime && formik.errors.endTime ? (
            <div className="text-danger">{formik.errors.endTime}</div>
          ) : null}
        </Col>
        <Col xs={12}>
          <ButtonsForMove stepper={stepper} form={false} />
        </Col>
      </Row>
    </Form>
  );
};

export default AddShop;
