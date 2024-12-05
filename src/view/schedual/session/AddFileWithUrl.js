import { Fragment } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { AddFileSessionWithId } from "../../../@core/services/api/post-api";
import {
  FileFormatFields,
  SessionFileFields,
} from "../../../@core/constants/session/AddFileSession";
import { useMutationWithRefetch } from "../../../utility/hooks/useCustomQuery";

const AddFileWithUrl = ({ sessionData, refetch, toggle }) => {
  // validation

  const { mutate } = useMutationWithRefetch(
    "ADD_FILE_SESSION_ID",
    AddFileSessionWithId,
    refetch
  );

  return (
    <Fragment>
      <div className="mx-auto mb-3 mt-1">
        <Formik
          initialValues={{
            Url: "",
            FileName: "",
            FileFormat: "",
          }}
          //   validationSchema={validCreateCourseLv1}
          onSubmit={(values, { setSubmitting }) => {
            mutate(
              Object.assign(values, {
                SessionId: sessionData.scheduleSessionId,
              })
            );
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="d-flex flex-column gap-1 py-2 mb-1 w-full rounded">
              {SessionFileFields.map((fields) => (
                <div className="form-group" key={fields.id}>
                  <label htmlFor="Title">{fields.label}</label>
                  <Field
                    id={fields.value}
                    name={fields.value}
                    placeholder={fields.label}
                    className={`form-control ${
                      errors?.[fields.value] && touched?.[fields.value]
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name={fields.value}
                    component="div"
                    className="text-danger"
                  />
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="FileFormat">فرمت فایل</label>
                <Field
                  id="FileFormat"
                  as="select"
                  name="FileFormat"
                  className="form-control"
                >
                  {FileFormatFields.map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="FileFormat"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-1"
                disabled={isSubmitting}
              >
                ثبت
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

export default AddFileWithUrl;
