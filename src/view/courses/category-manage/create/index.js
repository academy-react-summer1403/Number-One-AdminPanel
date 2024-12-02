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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Camera } from "react-feather";
import { CreateTechnologies } from "../../../../@core/services/api/post-api";
import { UpdateTechnologies } from "../../../../@core/services/api/put-api";
import TechnologiesValidation from "../../../../@core/validations/Technologies.Validation";
const AddTechnologyModal = ({
  showModal,
  setShowModal,
  refetch,
  variantState,
  categoryDetails,
}) => {
  // console.log(variantState)
  const [src, setSrc] = useState();
  // console.log(categoryDetails);

  const titleVariant = {
    create: "افزودن تکنولوژی جدید",
    update: "ویرایش تکنولوژی",
  };

  // Creating categories for blogs
  const { mutate: AddTechnology } = useMutation({
    mutationKey: ["CREATE_TECHNOLOGIES"],
    mutationFn: (values) => {
      CreateTechnologies(values, refetch);
    },
    onSuccess: () => setShowModal(!showModal),
  });

  // Editing categories for blogs
  const { mutate: updateMutate } = useMutation({
    mutationKey: ["UPDATE_TECHNOLOGY"],
    mutationFn: (values) => {
      UpdateTechnologies(values, refetch);
    },
    onSuccess: () => setShowModal(!showModal),
  });
  // initialValues
  // console.log(categoryDetails.techName)
  const initialValues = {
    iconAddress: variantState == "update" ? categoryDetails.iconAddress : "",
    techName: variantState == "update" ? categoryDetails.techName : "",
    describe: variantState == "update" ? categoryDetails.describe : "",
  };


  const formik = useFormik({
    initialValues,
    validationSchema: TechnologiesValidation,
    onSubmit: async (values, { setSubmitting }) => {
      if (variantState == "create") {
        AddTechnology(values);
      } else {
        updateMutate(Object.assign(values, { id: categoryDetails.id }));
      }
      setSubmitting(false);
    },
  });

  const handleChooseImage = (event) => {
    let file = URL.createObjectURL(event.target.files[0]);
    setSrc(file);
    formik.setFieldValue("Image", file);
  };
  return (
    <div className="vertically-centered-modal ">
      <Modal
        className="modal-dialog-centered modal-lg"
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
      >
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          {titleVariant?.[variantState]}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col
                md="6"
                className="mb-1"
                style={{ height: "250px", position: "relative" }}
              >
                <img className="w-100 h-100 rounded-4" src={src} alt="" />
                <Label
                  for="iconAddress"
                  style={{
                    border: "1px solid #ccc",
                    overflow: "hidden",
                    width: "80px",
                    height: "80px",
                    borderRadius: "100%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    zIndex: "10px",
                    translate: "-50% -50%",
                    cursor: "pointer",
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Camera />
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    multiple
                    id="iconAddress"
                    className="h-100"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      handleChooseImage(event);
                    }}
                  />
                </Label>
              </Col>
              <Col md="6" sm="12">
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="techName">
                    عنوان تکنولوژی
                  </Label>
                  <Input
                    type="text"
                    name="techName"
                    id="techName"
                    placeholder="نام تکنولوژی"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.techName}
                    invalid={
                      formik.touched.techName && !!formik.errors.techName
                    }
                  />
                  {formik.touched.techName && formik.errors.techName ? (
                    <div className="text-danger">{formik.errors.techName}</div>
                  ) : null}
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="describe">
                    توضیحات تکنولوژی
                  </Label>
                  <Input
                    type="string"
                    name="describe"
                    id="describe"
                    placeholder="توضیحات"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.describe}
                    invalid={
                      formik.touched.describe && !!formik.errors.describe
                    }
                  />
                  {formik.touched.describe && formik.errors.describe ? (
                    <div className="text-danger">{formik.errors.describe}</div>
                  ) : null}
                </Col>
              </Col>
              <Col sm="12">
                <div className="d-flex mt-1">
                  <Button
                    className="me-1"
                    color="primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    ثبت
                  </Button>
                  <Button
                    outline
                    color="secondary"
                    type="reset"
                    onClick={formik.handleReset}
                  >
                    پاک کردن همه
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddTechnologyModal;
