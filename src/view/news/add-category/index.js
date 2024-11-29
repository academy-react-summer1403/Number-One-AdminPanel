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
} from "reactstrap";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Camera } from "react-feather";
import BlogCategoryValidation from "../../../@core/validations/BlogCategory.Validation";
import { CreateNewsCategory } from "../../../@core/services/api/post-api";

const AddBlogCategoryWrapper = () => {
  const [src, setSrc] = useState();

  const initialValues = {
    Image: "",
    CategoryName: "",
    GoogleTitle: "",
    GoogleDescribe: "",
  };

  const { mutate } = useMutation({
    mutationKey: ["CREATE_BLOG_CATEGORY"],
    mutationFn: (values) => {
      console.log(values)
      CreateNewsCategory(values)
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: BlogCategoryValidation,
    onSubmit: async (values, { setSubmitting }) => {
      mutate(values);
      setSubmitting(false);
    },
  });

  const handleChooseImage = (event) => {
    let file = URL.createObjectURL(event.target.files[0]);
    setSrc(file);
    formik.setFieldValue("Image", file);
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col
              md="6"
              className="mb-1"
              style={{ height: "275px", position: "relative" }}
            >
              <img className="w-100 h-100 rounded-4" src={src} alt="" />
              <Label
                for="Image"
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
                  id="Image"
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
                <Label className="form-label" for="CategoryName">
                  عنوان دسته بندی
                </Label>
                <Input
                  type="text"
                  name="CategoryName"
                  id="CategoryName"
                  placeholder="نام دسته بندی"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.CategoryName}
                  invalid={
                    formik.touched.CategoryName && !!formik.errors.CategoryName
                  }
                />
                {formik.touched.CategoryName && formik.errors.CategoryName ? (
                  <div className="text-danger">
                    {formik.errors.CategoryName}
                  </div>
                ) : null}
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="GoogleTitle">
                  عنوان گوگل
                </Label>
                <Input
                  type="string"
                  name="GoogleTitle"
                  id="GoogleTitle"
                  placeholder="عنوان گوکل"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.GoogleTitle}
                  invalid={
                    formik.touched.GoogleTitle && !!formik.errors.GoogleTitle
                  }
                />
                {formik.touched.GoogleTitle && formik.errors.GoogleTitle ? (
                  <div className="text-danger">{formik.errors.GoogleTitle}</div>
                ) : null}
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="GoogleDescribe">
                  توضیحات گوکل
                </Label>
                <Input
                  type="textarea"
                  name="GoogleDescribe"
                  id="GoogleDescribe"
                  placeholder="توضیحات گوگل"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.GoogleDescribe}
                  invalid={
                    formik.touched.GoogleDescribe &&
                    !!formik.errors.GoogleDescribe
                  }
                  style={{
                    maxHeight: "100px",
                    minHeight: "40px",
                    height: "50px",
                  }}
                />
                {formik.touched.GoogleDescribe &&
                formik.errors.GoogleDescribe ? (
                  <div className="text-danger">
                    {formik.errors.GoogleDescribe}
                  </div>
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
      </CardBody>
    </Card>
  );
};

export default AddBlogCategoryWrapper;
