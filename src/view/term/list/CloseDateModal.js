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
import ChangeMoment from "../../../utility/moment";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian from "react-date-object/calendars/gregorian";
import DateObject from "react-date-object";
import { useMutation } from "@tanstack/react-query";
import { AddTermCloseDate } from "../../../@core/services/api/post-api";
import { CloseDateFields } from "../../../@core/constants/term-manage/CloseDateFields";

const CloseDateModal = ({ data, refetch, isOpen, toggle, section }) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(CloseDateFields(data));
  }, [data]);

  const { mutate: create } = useMutation({
    mutationKey: ["CREATE_CLOSE_DATE"],
    mutationFn: (data) => {
      AddTermCloseDate(data, refetch);
    },
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (section === "create") {
        create(values);
      } else {
        update(values);
      }
    },
  });

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
          <h1 className="mb-1">
            {section === "update"
              ? "ویرایش تاریخ بسته بودن"
              : "ساخت تاریخ بسته بودن"}
          </h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="6" className="mb-1">
              <Label className="form-label" for="startCloseDate">
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
                  handleDatePicker(ev, "startCloseDate");
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                }}
                className="datePicker"
                value={ChangeMoment(
                  formik.values.startCloseDate,
                  "YYYY/MM/DD",
                  "persian"
                )}
              />
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="endCloseDate">
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
                  handleDatePicker(ev, "endCloseDate");
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                }}
                className="datePicker"
                value={ChangeMoment(
                  formik.values.endCloseDate,
                  "YYYY/MM/DD",
                  "persian"
                )}
              />
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="closeReason">
                دلیل بسته بودن
              </Label>
              <Input
                id="closeReason"
                placeholder="دلیل بسته بودن"
                name="closeReason"
                onChange={formik.handleChange}
                value={formik.values.closeReason}
                invalid={!!formik.errors.closeReason}
              />
              <FormFeedback>{formik.errors.closeReason}</FormFeedback>
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                {section === "create" ? "ساختن" : "ویرایش"}
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

export default CloseDateModal;
