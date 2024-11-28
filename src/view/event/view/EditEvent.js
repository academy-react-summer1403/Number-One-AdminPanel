// Query
import { useMutation } from "@tanstack/react-query";

// Formik
import { useFormik } from "formik";

// React Imports
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

// Reactstrap
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

// Api
import { UpdateEvent } from "../../../@core/services/api/put-api";
import DatePicker from "react-multi-date-picker";

// Customize Component
import { EditEventFields } from "../../../@core/constants/event-manage/EditEventFields";

const EditEvent = ({ data, isOpen, toggle, refetch }) => {
  const [initialValues, setInitialValues] = useState({});

  // Update Event
  const { mutate } = useMutation({
    mutationKey: ["UPDATE_EVENT"],
    mutationFn: (values) => {
      UpdateEvent(data.id, values, refetch);
    },
    onSuccess: () => {
      toggle();
    },
  });

  useEffect(() => {
    setInitialValues(EditEventFields(data));
  }, [data]);

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleDatePicker = (date) => {
    const gregorianDate = new DateObject(date).format("YYYY/MM/DD");
    formik.setFieldValue("startEventTime", gregorianDate);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">ویرایش اطلاعات این ایونت</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="7" className="mb-1">
              <Label className="form-label" for="title">
                عنوان
              </Label>
              <Input
                id="title"
                placeholder="عنوان ایونت"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                invalid={!!formik.errors.title}
              />
              <FormFeedback>{formik.errors.title}</FormFeedback>
            </Col>
            <Col md="5" className="mb-1">
              <Label className="form-label" for="title">
                قیمت
              </Label>
              <Input
                id="price"
                placeholder="قیمت ایونت"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                invalid={!!formik.errors.price}
              />
              <FormFeedback>{formik.errors.price}</FormFeedback>
            </Col>
            <Col md="6">
              <Label className="form-label" for="describe">
                توضیحات
              </Label>
              <Input
                id="describe"
                name="describe"
                type="textarea"
                onChange={formik.handleChange}
                value={formik.values.describe}
                placeholder="توضیحات"
                style={{ maxHeight: "145px", height: "145px" }}
              />
            </Col>
            <Col md="6">
              <Label className="form-label" for="miniDescribe">
                توضیح کوتاه
              </Label>
              <Input
                id="miniDescribe"
                name="miniDescribe"
                type="textarea"
                onChange={formik.handleChange}
                value={formik.values.miniDescribe}
                placeholder="توضیح کوتاه"
                style={{ maxHeight: "145px", height: "145px" }}
              />
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
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="currentImageAddress">
                آپلود عکس
              </Label>
              <Input
                id="currentImageAddress"
                type="file"
                name="currentImageAddress"
                onChange={formik.handleChange}
                placeholder="آپلود عکس"
              />
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

export default EditEvent;
