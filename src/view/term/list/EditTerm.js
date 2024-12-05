import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { EditTermFields } from "../../../@core/constants/term-manage/EditTermFields";
import { useQueryWithoutDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetDepartmentList } from "../../../@core/services/api/get-api";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import DateObject from "react-date-object";
import ChangeMoment from "../../../utility/moment";
import { useMutation } from "@tanstack/react-query";
import { UpdateTerm } from "../../../@core/services/api/put-api";

const EditTerm = ({ data, refetch, isOpen, toggle }) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(EditTermFields(data));
  }, [data]);

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_TERM"],
    mutationFn: (data) => {
      UpdateTerm(data, refetch);
    },
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.expire == "false" || values.expire == false) {
        mutate({ ...values, expire: false });
      } else if (values.expire == "true" || values.expire == true) {
        mutate({ ...values, expire: true });
      }
    },
  });

  const { data: departments, isSuccess: departmentSuccess } =
    useQueryWithoutDependencies("GET_DEPARTMENTS", GetDepartmentList);

  const handleDatePicker = (date, section) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDTHH:mm:ss");
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
          <h1 className="mb-1">ویرایش اطلاعات ترم</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="termName">
                نام ترم
              </Label>
              <Input
                id="termName"
                placeholder="نام ترم"
                name="termName"
                onChange={formik.handleChange}
                value={formik.values.termName}
                invalid={!!formik.errors.termName}
              />
              <FormFeedback>{formik.errors.termName}</FormFeedback>
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="departmentId">
                بخش
              </Label>
              <Input
                type="select"
                name="departmentId"
                id="departmentId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.departmentId}
                invalid={
                  formik.touched.departmentId && !!formik.errors.departmentId
                }
              >
                <option value="">انتخاب کنید</option>
                {departmentSuccess &&
                  departments.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.depName}
                    </option>
                  ))}
              </Input>
              {formik.touched.departmentId && formik.errors.departmentId ? (
                <div className="text-danger">{formik.errors.departmentId}</div>
              ) : null}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="startDate">
                زمان شروع
              </Label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{
                  width: "100%",
                }}
                format="YYYY/MM/DD"
                onChange={(ev) => {
                  handleDatePicker(ev, "startDate");
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                }}
                className="datePicker"
                value={ChangeMoment(
                  formik.values.startDate,
                  "YYYY/MM/DD",
                  "persian"
                )}
              />
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="endDate">
                زمان پایان
              </Label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{
                  width: "100%",
                }}
                format="YYYY/MM/DD"
                onChange={(ev) => {
                  handleDatePicker(ev, "endDate");
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                }}
                className="datePicker"
                value={ChangeMoment(
                  formik.values.endDate,
                  "YYYY/MM/DD",
                  "persian"
                )}
              />
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="expire">
                وضعیت
              </Label>
              <Input
                type="select"
                name="expire"
                id="expire"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expire}
                invalid={formik.touched.expire && !!formik.errors.expire}
              >
                <option value={false}>منقضی نشده</option>
                <option value={true}>منقضی شده</option>
              </Input>
              {formik.touched.expire && formik.errors.expire ? (
                <div className="text-danger">{formik.errors.expire}</div>
              ) : null}
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

export default EditTerm;
