// ** React Imports
import { Fragment, useState } from "react";

// ** formik Import
import { useFormik } from "formik";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import DateObject from "react-date-object";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Input, Label } from "reactstrap";
import DatePicker from "react-multi-date-picker";
import { validCreateCourseLv3 } from "../../../../@core/validations/CreateCourse.Validation";
import ButtonsForMove from "../../../../@core/components/button-for-move/ButtonsForMove";

const AddCourseStep3 = ({ stepper, setThirdLv, addCourse }) => {
  const formik = useFormik({
    initialValues: { StartTime: "", EndTime: "", MiniDescribe: "",UniqeUrlString:""},
    enableReinitialize: true,
    validationSchema: validCreateCourseLv3,
    onSubmit: (values) => {
      // console.log(values)
      setThirdLv(values);
      stepper.next();
    },
  });
  // Convert date to jalali and send to api
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());

  const handleDatePicker = (date, type) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("M/D/YYYY");
    if (type == "start") {
      formik.setFieldValue("StartTime", gregorianDate);
      console.log(gregorianDate)
      setStartValue(date);
    } else if (type == "end") {
      console.log(gregorianDate)
      formik.setFieldValue("EndTime", gregorianDate);
      setEndValue(date);
    }
  };

  // Define validation schema
  return (
    <Fragment>
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column gap-1 shadow p-2 w-75 mx-auto mt-2 mb-5 rounded"
      >
        <div className="form-group">
          <Label className="form-label" for="StartTime">
            تاریخ شروع دوره
          </Label>
          <DatePicker
            id="StartTime"
            calendar={persian}
            locale={persian_fa}
            containerStyle={{
              width: "100%",
            }}
            value={startValue}
            format="YYYY/MM/DD"
            onChange={(date) => handleDatePicker(date, "start")}
            style={{
              width: "100%",
              height: "39px",
              paddingLeft: "14px",
              paddingRight: "14px",
            }}
            className="datePicker"
            invalid={formik.touched.StartTime && !!formik.errors.StartTime}
          />
          {formik.touched.StartTime && formik.errors.StartTime ? (
            <div className="text-danger">{formik.errors.StartTime}</div>
          ) : null}
        </div>
        <div className="form-group">
          <Label className="form-label" for="EndTime">
            تاریخ پایان دوره
          </Label>
          <DatePicker
            id="EndTime"
            calendar={persian}
            locale={persian_fa}
            containerStyle={{
              width: "100%",
            }}
            value={endValue}
            format="YYYY/MM/DD"
            onChange={(date) => handleDatePicker(date, "end")}
            style={{
              width: "100%",
              height: "39px",
              paddingLeft: "14px",
              paddingRight: "14px",
            }}
            className="datePicker"
            invalid={formik.touched.EndTime && !!formik.errors.EndTime}
          />
          {formik.touched.EndTime && formik.errors.EndTime ? (
            <div className="text-danger">{formik.errors.EndTime}</div>
          ) : null}
        </div>
        <div className="form-group">
          <Label className="form-label" for="UniqeUrlString">
            شناسه دوره 
          </Label>
          <Input
            id="UniqeUrlString"
            name="UniqeUrlString"
            placeholder="شناسه دوره"
            onChange={formik.handleChange}
            value={formik.values.UniqeUrlString}
            // style={{ maxHeight: "100px", minHeight: "50px" }}
            invalid={
              formik.touched.UniqeUrlString && !!formik.errors.UniqeUrlString
            }
          />
          {formik.touched.UniqeUrlString && formik.errors.UniqeUrlString ? (
            <div className="text-danger">{formik.errors.UniqeUrlString}</div>
          ) : null}
        </div>
        <div className="form-group">
          <Label className="form-label" for="MiniDescribe">
            توضیحات کوتاه
          </Label>
          <Input
            type="textarea"
            id="MiniDescribe"
            name="MiniDescribe"
            placeholder="توضیحات کوتاه"
            onChange={formik.handleChange}
            value={formik.values.MiniDescribe}
            style={{ maxHeight: "100px", minHeight: "50px" }}
            invalid={
              formik.touched.MiniDescribe && !!formik.errors.MiniDescribe
            }
          />
          {formik.touched.MiniDescribe && formik.errors.MiniDescribe ? (
            <div className="text-danger">{formik.errors.MiniDescribe}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary mt-1">
          ثبت
        </button>
      </form>
      <div>
        <ButtonsForMove stepper={stepper} />
      </div>
    </Fragment>
  );
};

export default AddCourseStep3;
