import { Fragment } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import "@styles/react/libs/react-select/_react-select.scss";
import { Col, Row } from "reactstrap";
import { secondLevelFields } from "../../../../@core/constants/courses";
import { validCreateCourseLv2 } from "../../../../@core/validations/CreateCourse.Validation";
import ButtonsForMove from "../../../../@core/components/button-for-move/ButtonsForMove";

const AddCourseStep2 = ({ stepper, setSecondLv, courseOptions }) => {
  return (
    <Fragment>
      <div className="mx-auto mb-1">
        <Formik
          initialValues={{
            CourseTypeId: [1],
            CourseLvlId: [1],
            TeacherId: [1],
            TremId: [1],
            ClassId: [1],
            SessionNumber: "",
          }}
          validationSchema={validCreateCourseLv2}
          onSubmit={(values, { setSubmitting }) => {
            // console.log(values);
            setSecondLv(values);
            stepper.next();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="d-flex flex-column gap-1 shadow pt-2 px-3 my-1 rounded">
              <Row className="mb-1">
                <Col xl="6">
                  {secondLevelFields.slice(0, 3).map((field) => (
                    <div className="form-group pb-2" key={field.id}>
                      <label htmlFor={field.value}>{field.label}</label>
                      <Field
                        id={field.value}
                        as="select"
                        name={field.value}
                        className="form-control"
                      >
                        {courseOptions?.[field.array] &&
                          courseOptions?.[field.array].map((item, index) => (
                            <option
                              key={index}
                              value={item.id ?? item.teacherId}
                            >
                              {item?.[field.keySelect]}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        name={field.value}
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  ))}
                </Col>
                <Col xl="6">
                  {secondLevelFields.slice(3, 5).map((field) => (
                    <div className="form-group pb-2" key={field.id}>
                      <label htmlFor={field.value}>{field.label}</label>

                      <Field
                        id={field.value}
                        as="select"
                        name={field.value}
                        className="form-control"
                      >
                        {courseOptions?.[field.array] &&
                          courseOptions?.[field.array].map((item, index) => (
                            <option key={index} value={item?.id}>
                              {item?.[field.keySelect]}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        name={field.value}
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  ))}
                  <div className="form-group">
                    <label htmlFor="SessionNumber">تعداد جلسه </label>
                    <Field
                      id="SessionNumber"
                      type="number"
                      name="SessionNumber"
                      placeholder="تعداد جلسه"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="SessionNumber"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Col>
                <button
                  type="submit"
                  className="btn btn-primary mt-1"
                  onClick={() => stepper.next()}
                  disabled={isSubmitting}
                >
                  ثبت
                </button>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <ButtonsForMove stepper={stepper} />
      </div>
    </Fragment>
  );
};

export default AddCourseStep2;
