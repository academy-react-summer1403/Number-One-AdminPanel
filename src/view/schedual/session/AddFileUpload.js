import { Form, Formik } from "formik";
import { Label } from "reactstrap";
import { Camera } from "react-feather";
import { useState } from "react";
import { useMutationWithRefetch } from "../../../utility/hooks/useCustomQuery";
import { AddFileSessionUpload } from "../../../@core/services/api/post-api";

const AddFileUpload = ({ sessionData, refetch, toggle }) => {
  const [src, setSrc] = useState();

  const { mutate } = useMutationWithRefetch(
    "ADD_FILE_SESSION_UPLOAD",
    AddFileSessionUpload,
    refetch
  );
  // console.log(mutate.success)
  // if (mutate.success) toggle();

  return (
    <>
      <Formik
        initialValues={{ SessionFiles: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          mutate(
            Object.assign(values, { SessionId: sessionData.scheduleSessionId })
          );
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
                for="SessionFiles"
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
                  id="SessionFiles"
                  className="h-100"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    const file = URL.createObjectURL(event.target.files[0]);
                    setSrc(file);
                    formik.setFieldValue("SessionFiles", event.target.files[0]); 
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
    </>
  );
};

export default AddFileUpload;
