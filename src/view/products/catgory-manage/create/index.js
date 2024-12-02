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
import { CreateProductCategory} from "../../../../@core/services/api/post-api";
import {
  UpdateProductCategory,
  UpdateShopCategory,
} from "../../../../@core/services/api/put-api";
import ShopCategoryValidation from "../../../../@core/validations/ShopCategory.Validation";
const AddProductCategoryModal = ({
  showModal,
  setShowModal,
  refetch,
  variantState,
  categoryDetails,
}) => {
  const titleVariant = {
    create: "افزودن دسته بندی",
    update: "ویرایش دسته بندی",
  };

  // Creating categories for blogs
  const { mutate: AddCategory } = useMutation({
    mutationKey: ["CREATE_PRODUCT_CATEGORY"],
    mutationFn: (values) => {
      CreateProductCategory(values, refetch);
    },
    onSuccess: () => setShowModal(!showModal),
  });

  // Editing categories for blogs
  const { mutate: updateMutate } = useMutation({
    mutationKey: ["UPDATE_LEVEL"],
    mutationFn: (values) => {
      UpdateProductCategory(categoryDetails.id, values, refetch);
    },
    onSuccess: () => setShowModal(!showModal),
  });
  // initialValues
  const initialValues = {
    categoryName: variantState == "update" ? categoryDetails.categoryName : "",
    describe: variantState == "update" ? categoryDetails.describe : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ShopCategoryValidation,
    onSubmit: async (values, { setSubmitting }) => {
      if (variantState == "create") {
        AddCategory(values);
      } else {
        updateMutate(values);
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
                <Label className="form-label" for="categoryName">
                  نام دسته بندی
                </Label>
                <Input
                  type="text"
                  name="categoryName"
                  id="categoryName"
                  placeholder="نام دسته بندی"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoryName}
                  invalid={
                    formik.touched.categoryName && !!formik.errors.categoryName
                  }
                />
                {formik.touched.categoryName && formik.errors.categoryName ? (
                  <div className="text-danger">
                    {formik.errors.categoryName}
                  </div>
                ) : null}
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="describe">
                  توضیحات دسته بندی
                </Label>
                <Input
                  type="text"
                  name="describe"
                  id="describe"
                  placeholder="توضیحات"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.describe}
                  invalid={formik.touched.describe && !!formik.errors.describe}
                />
                {formik.touched.describe && formik.errors.describe ? (
                  <div className="text-danger">{formik.errors.describe}</div>
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

export default AddProductCategoryModal;
