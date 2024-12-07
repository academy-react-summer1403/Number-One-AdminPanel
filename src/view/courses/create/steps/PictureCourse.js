import { ErrorMessage, Form, Formik } from "formik";
import { validCreateImageCourse } from "../../../../@core/validations/CreateCourse.Validation";
import { Input, Label } from "reactstrap";
import { Camera } from "react-feather";
import { useEffect, useState } from "react";
import ButtonsForMove from "../../../../@core/components/button-for-move/ButtonsForMove";
import { CreateImageAi } from "../../../../@core/services/api/post-api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const PictureCourse = ({ courseId, stepper, setImage, setCreateBtn }) => {
  const [src, setSrc] = useState("");
  const [aiImgStatus, setAiImgStatus] = useState(false);

  // create img with Ai
  const CreatePicAi = useMutation({
    mutationKey: ["CREATE_PICTURE_AI"],
    mutationFn: (imgData) => CreateImageAi(imgData),
  });

  const sendPic = (text) => {
    console.log(text);
    setAiImgStatus(true);
    const PictureData = {
      prompt: text,
      seed: 17123564234,
      scheduler: "DDIM",
      num_inference_steps: 20,
      negative_prompt: "NONE",
      samples: 1,
      guidance_scale: 7.5,
      strength: 1,
      shape: 512,
    };
    CreatePicAi.mutate(PictureData);
  };

  useEffect(() => {
    if (CreatePicAi.data) {
      setSrc(CreatePicAi.data);
      // console.log(CreatePicAi.data);
    }
  }, [CreatePicAi.data]);

  return (
    <>
      <Formik
        initialValues={{ Text: "" }}
        validationSchema={validCreateImageCourse}
        onSubmit={async (values, { setSubmitting }) => {
          sendPic(values.Text);
          // console.log(values.Text);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Label htmlFor="Text" className="mb-1">
              با Ai میتوانید عکس مورد نظر خود را بسازید!!
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
      </Formik>
      <Formik
        initialValues={{ Image: "" }}
        // validationSchema={validCreateImageCourse}
        onSubmit={async (values, { setSubmitting }) => {
          if (aiImgStatus && CreatePicAi.data) {
            // console.log(src);
            setImage({ Image: src });
          } else { setImage(values && values); toast.success("عکس مورد نطر ثبت شد")}
          // GenerateImage(values.Text);
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
                    // console.log(src);
                    if (file) {
                      formik.setFieldValue("Image", event.target.files[0]);
                    }
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
            <button
              className="btn btn-success ms-2"
              style={{ height: "38px" }}
              onClick={() => setCreateBtn(true)}
            >
              ساخت دوره
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
