import { useFormik } from "formik";
import { useState } from "react";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import {
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from "reactstrap";

const EditModal = ({ data, refetch, isOpen, toggle }) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    // setInitialValues(EditDepartmentFields(data));
  }, [data]);

  //   const { mutate } = useMutation({
  //     mutationKey: ["UPDATE_DEPARTMENT"],
  //     mutationFn: (data) => {
  //       UpdateDepartment(data, refetch);
  //     }
  //   });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    }
  });

  const handleDatePicker = (section, date) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDTHH:mm:ss");
    console.log(gregorianDate);
    formik.setFieldValue(section, gregorianDate);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-base"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">ویرایش اطلاعات رزومه</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="jobTitle">
                نام رزومه
              </Label>
              <Input
                id="jobTitle"
                placeholder="نام بخش"
                name="jobTitle"
                onChange={formik.handleChange}
                value={formik.values.jobTitle}
                invalid={!!formik.errors.jobTitle}
              />
              <FormFeedback>{formik.errors.jobTitle}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="aboutJob">
                درباره رزومه
              </Label>
              <Input
                id="aboutJob"
                placeholder="درباره بخش"
                name="aboutJob"
                onChange={formik.handleChange}
                value={formik.values.aboutJob}
                invalid={!!formik.errors.aboutJob}
              />
              <FormFeedback>{formik.errors.aboutJob}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="companyWebSite">
                وب سایت شرکت
              </Label>
              <Input
                id="companyWebSite"
                placeholder="دربازه بخش"
                name="companyWebSite"
                onChange={formik.handleChange}
                value={formik.values.companyWebSite}
                invalid={!!formik.errors.companyWebSite}
              />
              <FormFeedback>{formik.errors.companyWebSite}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="companyLinkdin">
                لینکدین شرکت
              </Label>
              <Input
                id="companyLinkdin"
                placeholder="لینکدین شرکت"
                name="companyLinkdin"
                onChange={formik.handleChange}
                value={formik.values.companyLinkdin}
                invalid={!!formik.errors.companyLinkdin}
              />
              <FormFeedback>{formik.errors.companyLinkdin}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="workStartDate">
                شروع کار
              </Label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{
                  width: "100%"
                }}
                format="YYYY/MM/DD"
                onChange={(date) => {
                  handleDatePicker("workStartDate", date);
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px"
                }}
                className="datePicker"
              />
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="workEndDate">
                پایان کار
              </Label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{
                  width: "100%"
                }}
                format="YYYY/MM/DD"
                onChange={(date) => {
                  handleDatePicker("workEndDate", date);
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px"
                }}
                className="datePicker"
              />
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="inWork">
                ساختمان
              </Label>
              <Input
                type="select"
                name="inWork"
                id="inWork"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.inWork}
                invalid={formik.touched.inWork && !!formik.errors.inWork}
              >
                <option value="">انتخاب کنید</option>
                <option value={true}>خیر</option>
                <option value={false}>بله</option>
              </Input>
              {formik.touched.inWork && formik.errors.inWork ? (
                <div className="text-danger">{formik.errors.inWork}</div>
              ) : null}
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="companyName">
                نام شرکت
              </Label>
              <Input
                id="companyName"
                placeholder="نام شرکت"
                name="companyName"
                onChange={formik.handleChange}
                value={formik.values.companyName}
                invalid={!!formik.errors.companyName}
              />
              <FormFeedback>{formik.errors.companyName}</FormFeedback>
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                ویرایش
              </Button>
              <Button type="reset" color="secondary" outline onClick={toggle}>
                لغو
              </Button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
