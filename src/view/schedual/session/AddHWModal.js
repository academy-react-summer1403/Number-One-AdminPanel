import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
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
import { AddHomeWork } from "../../../@core/services/api/post-api";
import { AddHWValidation } from "../../../@core/validations/Session.Validation";

const AddHWModal = ({ refetch, toggle, isOpen, sessionId }) => {
  const initialValues = {
    sessionId: sessionId,
    hwTitle: "",
    hwDescribe: "",
  };

  const { mutate } = useMutation({
    mutationKey: ["CREATE_HOMEWORK"],
    mutationFn: (data) => {
      AddHomeWork(data, refetch);
    },
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    validationSchema: AddHWValidation,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">افزودن تکلیف</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="hwTitle">
                نام تکلیف
              </Label>
              <Input
                id="hwTitle"
                placeholder="نام تکلیف"
                name="hwTitle"
                onChange={formik.handleChange}
                value={formik.values.hwTitle}
                invalid={!!formik.errors.hwTitle}
              />
              <FormFeedback>{formik.errors.hwTitle}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="hwDescribe">
                توضیحات
              </Label>
              <Input
                id="hwDescribe"
                placeholder="توضیحات"
                name="hwDescribe"
                onChange={formik.handleChange}
                value={formik.values.hwDescribe}
                invalid={!!formik.errors.hwDescribe}
              />
              <FormFeedback>{formik.errors.hwDescribe}</FormFeedback>
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                ساختن
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

export default AddHWModal;
