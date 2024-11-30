import { useFormik } from "formik";

import {
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
import { CreateCourseLevel, CreateCourseStatus } from "../../../../@core/services/api/post-api";
import {
  UpdateCourseLevel,
} from "../../../../@core/services/api/put-api";
import CourseLevelsValidation from "../../../../@core/validations/CourseLevels.Validation";
const AddLevelModal = ({
  showModal,
  setShowModal,
  refetch,
  variantState,
  categoryDetails,
}) => {

  const titleVariant = {
    create: "افزودن سطح جدید",
    update: "ویرایش سطح",
  };

  // Creating categories for blogs
  const { mutate: AddLevel } = useMutation({
    mutationKey: ["CREATE_LEVEL"],
    mutationFn: (values) => {
      CreateCourseLevel(values, refetch);
    },
    onSuccess: () => setShowModal(!showModal),
  });

  // Editing categories for blogs
  const { mutate: updateMutate } = useMutation({
    mutationKey: ["UPDATE_LEVEL"],
    mutationFn: (values) => {
      UpdateCourseLevel(values, refetch);
    },
    onSuccess: () => setShowModal(!showModal),
  });
  // initialValues
  console.log(categoryDetails.levelName)
  const initialValues = {
    levelName: variantState == "update" ? categoryDetails.levelName : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CourseLevelsValidation,
    onSubmit: async (values, { setSubmitting }) => {
      if (variantState == "create") {
        AddLevel(Object.assign(values, { id: 1 }));
      } else {
        updateMutate(Object.assign(values, { id: categoryDetails.id }));
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="vertically-centered-modal ">
      <Modal
        className="modal-dialog-centered modal-md"
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
      >
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          {titleVariant?.[variantState]}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="levelName">
                    سطح دوره 
                  </Label>
                  <Input
                    type="text"
                    name="levelName"
                    id="levelName"
                    placeholder="سطح دوره"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.levelName}
                    invalid={
                      formik.touched.levelName && !!formik.errors.levelName
                    }
                  />
                  {formik.touched.levelName && formik.errors.levelName ? (
                    <div className="text-danger">
                      {formik.errors.levelName}
                    </div>
                  ) : null}
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
                    پاک کردن فیلد
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

export default AddLevelModal;
