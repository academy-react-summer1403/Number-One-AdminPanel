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
import { AddSession } from "../../../@core/services/api/post-api";
import { AddSessionValidation } from "../../../@core/validations/Session.Validation";
import { useEffect, useState } from "react";
import { EditSessionFields } from "../../../@core/constants/session/EditSessionFields";
import { UpdateSession } from "../../../@core/services/api/put-api";

const AddUpdateSessionModal = ({ refetch, data, toggle, isOpen, section }) => {
  const [initialValues, setInitialValues] = useState();
console.log(isOpen)
  useEffect(() => {
    setInitialValues(EditSessionFields(data));
  }, [data]);

  const { mutate: create } = useMutation({
    mutationKey: ["CREATE_SESSION"],
    mutationFn: (data) => {
      AddSession(data, refetch);
    },
  });

  const { mutate: update } = useMutation({
    mutationKey: ["UPDATE_SESSION"],
    mutationFn: (data) => {
      UpdateSession(data, refetch);
    },
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    validationSchema: AddSessionValidation,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (section === "create") {
        create(values);
      } else {
        update(values);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">
            {section === "create" ? "افزودن جلسه" : "ویرایش جلسه"}
          </h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="sessionTitle">
                نام جلسه
              </Label>
              <Input
                id="sessionTitle"
                placeholder="نام جلسه"
                name="sessionTitle"
                onChange={formik.handleChange}
                value={formik.values?.sessionTitle}
                invalid={!!formik.errors.sessionTitle}
              />
              <FormFeedback>{formik.errors.sessionTitle}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="sessionDescribe">
                توضیحات
              </Label>
              <Input
                id="sessionDescribe"
                placeholder="توضیحات"
                name="sessionDescribe"
                onChange={formik.handleChange}
                value={formik.values?.sessionDescribe}
                invalid={!!formik.errors.sessionDescribe}
              />
              <FormFeedback>{formik.errors.sessionDescribe}</FormFeedback>
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

export default AddUpdateSessionModal;
