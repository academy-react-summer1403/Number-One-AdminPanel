import { useFormik } from "formik";
import { useState } from "react";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { useDispatch } from "react-redux";
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { handleFilterDate } from "../store";

const FilterModal = ({ isOpen, toggle }) => {
  const initialValues = {
    startDate: "",
    endDate: "",
  };
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(handleFilterDate(values));
      toggle();
    },
  });

  const handleDatePicker = (date, section) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DD");
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
          <h1 className="mb-1">فیلتر تاریخ</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="startDate">
                تایم شروع
              </Label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{
                  width: "100%",
                }}
                format="YYYY/MM/DD"
                onChange={(date) => {
                  handleDatePicker(date, "startDate");
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                }}
                className="datePicker"
              />
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="workDate">
                تایم پایان
              </Label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                containerStyle={{
                  width: "100%",
                }}
                format="YYYY/MM/DD"
                onChange={(date) => {
                  handleDatePicker(date, "endDate");
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                }}
                className="datePicker"
              />
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                فیلتر
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

export default FilterModal;
