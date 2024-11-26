import { ErrorMessage, Field, Form, Formik } from "formik";
import GenerateImage from "../../../../utility/create-img-ai/GenerateImgAi";
import { validCreateImageCourse } from "../../../../@core/validations/CreateCourse.Validation";
import { Input, Label } from "reactstrap";
import { Camera } from "react-feather";
import { useState } from "react";
import ButtonsForMove from "../../../../@core/components/button-for-move/ButtonsForMove";

const PictureCourse = ({ courseId,stepper ,setImage }) => {
  const [src, setSrc] = useState();

  return (
    <>
      {/* <Formik
        initialValues={{ Text: "" }} // افزودن img به initialValues
        validationSchema={validCreateImageCourse}
        onSubmit={async (values, { setSubmitting }) => {
          GenerateImage(values.Text);
          console.log(first);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Label htmlFor="Text" className="mb-1">
              میتوانید عکس مورد نظر خود را بسازید!!
            </Label>
            <div className="d-flex gap-2 mb-1">
              <div className="form-group w-75 ">
                <Input
                  id="Text"
                  name="Text"
                  placeholder={"جستجوی تصویر ...."}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Text}
                  invalid={formik.touched.Text && !!formik.errors.Text}
                />
                <ErrorMessage name="Text">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ height: "38px" }}
                disabled={formik.isSubmitting}
              >
                جستجو تصویر
              </button>
            </div>
          </Form>
        )}
      </Formik> */}
      <Formik
        initialValues={{ ImageAddress: "" }} // افزودن img به initialValues
        // validationSchema={validCreateImageCourse}
        onSubmit={async (values, { setSubmitting }) => {
          // GenerateImage(values.Text);
          setImage(values && values);
          console.log(values);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div
              md="6"
              className="mb-1"
              style={{ height: "300px", position: "relative" }}
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
                  id="Image"
                  className="h-100"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    const file = URL.createObjectURL(event.target.files[0]);
                    setSrc(file);
                    formik.setFieldValue("ImageAddress", event.target.files[0]); // ذخیره کردن img در Formik
                  }}
                />
              </Label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ height: "38px" }}
              disabled={formik.isSubmitting}
            >
              ثبت تصویر
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <ButtonsForMove stepper={stepper} />
      </div>
    </>
  );
};

export default PictureCourse;
