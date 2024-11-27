import { useFormik } from "formik";
import { Col, Form, Input, Label, Row } from "reactstrap";

import { ButtonsForMove } from "../../../../@core/components/create-item-steps";
import { useDispatch } from "react-redux";
import { handleEventInfo } from "../../store/CreateEvent";

// Validations
import CreateEventValidations from "../../../../@core/validations/CreateEvent.Validation";

// Date
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

// Api
import GetAdminInfo from "../../../../@core/services/api/get-api/GetAdminInfo";
import { useQueryWithDependencies } from "../../../../utility/hooks/useCustomQuery";
import DateObject from "react-date-object";

const EventInfo = ({ stepper }) => {
  const dispatch = useDispatch();

  // Get addUserFullName
  const AdminId = localStorage.getItem("id") && localStorage.getItem("id");
  const { data, isSuccess } = useQueryWithDependencies(
    "GET_ADMIN_INFO",
    GetAdminInfo,
    null,
    AdminId
  );

  const initialValues = {
    title: "",
    price: 0,
    isActive: true,
    googleDescribe: "",
    googleTitle: "",
    miniDescribe: "",
    chairs: 0,
    students: 0,
    address: "",
    startEventTime: "",
    addUserFullName: isSuccess && data.fName,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CreateEventValidations,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(handleEventInfo(values));
      stepper.next();
      setSubmitting(false);
    },
  });

  // Handle Date Picker For Start Event
  const handleDatePicker = (date) => {
    const gregorianDate = new DateObject(date).format("YYYY/MM/DD");
    formik.setFieldValue("startEventTime", gregorianDate);
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col md="6" sm="12" className="">
          <Label className="form-label" for="title">
            عنوان ایونت
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
        <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="chairs">
            تعداد صندلی
          </Label>
          <Input
            type="text"
            name="chairs"
            id="chairs"
            placeholder="تعداد صندلی"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.chairs}
            invalid={formik.touched.chairs && !!formik.errors.chairs}
          />
          {formik.touched.chairs && formik.errors.chairs ? (
            <div className="text-danger">{formik.errors.chairs}</div>
          ) : null}
        </Col>
        <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="students">
            تعداد دانشجو
          </Label>
          <Input
            type="text"
            name="students"
            id="students"
            placeholder="تعداد دانشجو"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.students}
            invalid={formik.touched.students && !!formik.errors.students}
          />
          {formik.touched.students && formik.errors.students ? (
            <div className="text-danger">{formik.errors.students}</div>
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
            placeholder="قیمت"
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
          <Label className="form-label" for="address">
            آدرس
          </Label>
          <Input
            type="text"
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
          <Label className="form-label" for="startEventTime">
            تاریخ شروع
          </Label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            containerStyle={{
              width: "100%",
            }}
            value={formik.values.startEventTime}
            format="YYYY/MM/DD"
            onChange={handleDatePicker}
            style={{
              width: "100%",
              height: "39px",
              paddingLeft: "14px",
              paddingRight: "14px",
            }}
            className="datePicker"
          />
          {formik.touched.startEventTime && formik.errors.startEventTime ? (
            <div className="text-danger">{formik.errors.startEventTime}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="googleDescribe">
            توضیحات گوگل
          </Label>
          <Input
            type="textarea"
            name="googleDescribe"
            id="googleDescribe"
            placeholder="توضیحات"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.googleDescribe}
            invalid={
              formik.touched.googleDescribe && !!formik.errors.googleDescribe
            }
          />
          {formik.touched.googleDescribe && formik.errors.googleDescribe ? (
            <div className="text-danger">{formik.errors.googleDescribe}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="miniDescribe">
            توضیح کوتاه
          </Label>
          <Input
            type="textarea"
            name="miniDescribe"
            id="miniDescribe"
            placeholder="توضیحات"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.miniDescribe}
            invalid={
              formik.touched.miniDescribe && !!formik.errors.miniDescribe
            }
          />
          {formik.touched.miniDescribe && formik.errors.miniDescribe ? (
            <div className="text-danger">{formik.errors.miniDescribe}</div>
          ) : null}
        </Col>
        <Col xs={12}>
          <ButtonsForMove stepper={stepper} form={false} />
        </Col>
      </Row>
    </Form>
  );
};

export default EventInfo;
