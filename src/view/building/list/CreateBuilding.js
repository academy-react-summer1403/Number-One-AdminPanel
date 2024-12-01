import { useFormik } from "formik";
import { Fragment, useState } from "react";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
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
import ChooseMap from "./ChooseMap";
import { useMutation } from "@tanstack/react-query";
import { CreateNewBuilding } from "../../../@core/services/api/post-api";

const CreateBuilding = ({ isOpen, toggle, refetch }) => {
  // Location Modal
  const [locationModal, setLocationModal] = useState(false);
  const toggleLocationModal = () => setLocationModal(!locationModal);

  const { mutate } = useMutation({
    mutationKey: ["CREATE_BUILDING"],
    mutationFn: (data) => {
      CreateNewBuilding(data, refetch);
    },
  });

  const initialValues = {
    buildingName: "",
    workDate: "",
    floor: 0,
    latitude: "8",
    longitude: "13",
  };

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleDatePicker = (date) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDTHH:mm:ss");
    console.log(gregorianDate);
    formik.setFieldValue("workDate", gregorianDate);
  };

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-dialog-centered modal-base"
      >
        <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">اضافه کردن ساختمان</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              <Col md="12" className="mb-1">
                <Label className="form-label" for="buildingName">
                  نام ساختمان
                </Label>
                <Input
                  id="buildingName"
                  placeholder="نام ساختمان"
                  name="buildingName"
                  onChange={formik.handleChange}
                  value={formik.values.buildingName}
                  invalid={!!formik.errors.buildingName}
                />
                <FormFeedback>{formik.errors.buildingName}</FormFeedback>
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="workDate">
                  تایم کاری
                </Label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  containerStyle={{
                    width: "100%",
                  }}
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
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="floor">
                  طبقه
                </Label>
                <Input
                  id="floor"
                  placeholder="طبقه"
                  name="floor"
                  onChange={formik.handleChange}
                  value={formik.values.floor}
                  invalid={!!formik.errors.floor}
                />
                <FormFeedback>{formik.errors.floor}</FormFeedback>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ساختن
                </Button>
                <Button
                  onClick={toggleLocationModal}
                  className="me-1"
                  color="warning"
                >
                  انتخاب نشانی
                </Button>
                <Button type="reset" color="secondary" outline onClick={toggle}>
                  لغو
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <ChooseMap isOpen={locationModal} toggle={toggleLocationModal} />
    </Fragment>
  );
};

export default CreateBuilding;
