import { Fragment } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { FirstLevelFields } from "../../../../@core/constants/courses";
import { validCreateCourseLv1 } from "../../../../@core/validations/CreateCourse.Validation";

const AddCourseStep1 = ({ stepper, setFirstLv }) => {
  // validation
 
  return (
    <Fragment>
      <div className="w-75 mx-auto mb-3 mt-1">
        <Formik
          initialValues={{
            Title: "",
            GoogleTitle: "",
            Cost: "",
            Capacity: "",
          }}
          validationSchema={validCreateCourseLv1}
          onSubmit={(values, { setSubmitting }) => {
            setFirstLv(values);
            stepper.next();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="d-flex flex-column gap-1 shadow px-3 py-2 mb-5 w-full rounded">
              {FirstLevelFields.map((fields) => (
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

export default AddCourseStep1;
