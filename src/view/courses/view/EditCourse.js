import { Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import persian_en from "react-date-object/locales/persian_en";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian from "react-date-object/calendars/gregorian";
import { useMutationWithRefetch, useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetCourseById, GetCreateCourse } from "../../../@core/services/api/get-api";
import { UpdateCourse } from "../../../@core/services/api/put-api";
import { EditCourseField } from "../../../@core/constants/courses";
import EditCourseValidation from "../../../@core/validations/EditCourse_Validation";
import DatePicker from "react-multi-date-picker";

const EditCourse = ({ isOpen, toggle, refetchData }) => {
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: detailsData,
    refetch,
    isSuccess,
  } = useQueryWithDependencies("GET_COURSE_DETAILS", GetCourseById, id, id);
  const { data: courseElements } = useQueryWithDependencies(
    "GET_COURSE_ELEMENTS",
    GetCreateCourse,
    null,
    null
  );

  const { mutate } = useMutationWithRefetch(
    "UPDATE_COURSES",
    UpdateCourse,
    toggle,
    refetchData
  );

  useEffect(() => {
    if (isSuccess === true) {
      setInitialValues(EditCourseField(detailsData));
    }
  }, [isSuccess]);

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    validationSchema: EditCourseValidation,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  // const [url, setUrl] = useState();
  // const [picture, setPicture] = useState();

  // useEffect(() => {
  //   if (!url) return
  //   setPicture(URL.createObjectURL(url))

  // }, [url])

  // Convert date to jalali and send to api
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());

  const handleDatePicker = (date, type) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("M/D/YYYY HH:mm:ss A");
    if (type == "start") {
      formik.setFieldValue("StartTime", gregorianDate);
      setStartValue(date);
    } else if (type == "end") {
      formik.setFieldValue("EndTime", gregorianDate);
      setEndValue(date);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">ویرایش اطلاعات دوره</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              <Col md="6" className="mb-1">
                <Label className="form-label" for="Title">
                  عنوان دوره
                </Label>
                <Input
                  id="Title"
                  placeholder="عنوان دوره"
                  name="Title"
                  onChange={formik.handleChange}
                  value={formik.values.Title}
                  invalid={formik.touched.Title && !!formik.errors.Title}
                />
                {formik.touched.Title && formik.errors.Title ? (
                  <div className="text-danger">{formik.errors.Title}</div>
                ) : null}
              </Col>
              <Col md="3" className="mb-1">
                <Label className="form-label" for="Capacity">
                  ظرفیت دوره
                </Label>
                <Input
                  id="Capacity"
                  name="Capacity"
                  onChange={formik.handleChange}
                  value={formik.values.Capacity}
                  placeholder="ظرفیت دوره"
                  invalid={formik.touched.Capacity && !!formik.errors.Capacity}
                />
                {formik.touched.Capacity && formik.errors.Capacity ? (
                  <div className="text-danger">{formik.errors.Capacity}</div>
                ) : null}
              </Col>
              <Col md="3">
                <Label className="form-label" for="SessionNumber">
                  تعداد جلسات
                </Label>
                <Input
                  id="SessionNumber"
                  name="SessionNumber"
                  onChange={formik.handleChange}
                  value={formik.values.SessionNumber}
                  placeholder="تعداد جلسات"
                  invalid={
                    formik.touched.SessionNumber &&
                    !!formik.errors.SessionNumber
                  }
                />
                {formik.touched.SessionNumber && formik.errors.SessionNumber ? (
                  <div className="text-danger">
                    {formik.errors.SessionNumber}
                  </div>
                ) : null}
              </Col>
              <Col md="4" className="mb-1">
                <Label className="form-label" for="CourseTypeId">
                  نحوه برگزاری
                </Label>
                <Input
                  id="CourseTypeId"
                  name="CourseTypeId"
                  type="select"
                  onChange={formik.handleChange}
                  placeholder="نحوه برگزاری"
                  defaultValue={isSuccess && detailsData?.courseTypeName}
                >
                  {courseElements?.courseTypeDtos?.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.typeName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col md="4" className="mb-1">
                <Label className="form-label" for="ClassId">
                  مکان برگزاری
                </Label>
                <Input
                  id="ClassId"
                  name="ClassId"
                  type="select"
                  onChange={formik.handleChange}
                  placeholder="مکان برگزاری"
                  defaultValue={isSuccess && detailsData?.courseClassRoomName}
                >
                  {courseElements?.classRoomDtos?.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.classRoomName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col md="4" className="mb-1">
                <Label className="form-label" for="CourseLvlId">
                  سطح دوره
                </Label>
                <Input
                  id="CourseLvlId"
                  name="CourseLvlId"
                  type="select"
                  onChange={formik.handleChange}
                  placeholder="سطح دوره"
                  defaultValue={isSuccess && detailsData?.courseLevelName}
                >
                  {courseElements?.courseLevelDtos?.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.levelName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col md="4" className="mb-1">
                <Label className="form-label" for="TeacherId">
                  مدرس دوره
                </Label>
                <Input
                  id="TeacherId"
                  name="TeacherId"
                  type="select"
                  onChange={formik.handleChange}
                  placeholder="مدرس دوره"
                  defaultValue={isSuccess && detailsData?.teacherName}
                >
                  {courseElements?.teachers?.map((classItem, index) => (
                    <option key={index} value={classItem.teacherId}>
                      {classItem.fullName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col sm="4" className="mb-1">
                <Label className="form-label" for="StartTime">
                  تاریخ شروع
                </Label>
                <DatePicker
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
                />
              </Col>
              <Col sm="4" className="mb-1">
                <Label className="form-label" for="EndTime">
                  تاریخ پایان
                </Label>
                <DatePicker
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
                />
              </Col>
              <Col md="8" className="mb-1">
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
                  <div className="text-danger">
                    {formik.errors.MiniDescribe}
                  </div>
                ) : null}
              </Col>
              <Col md="4" className="mb-1">
                <Label className="form-label" for="ImageAddress">
                  آپلود عکس
                </Label>
                <Input
                  id="ImageAddress"
                  type="file"
                  name="ImageAddress"
                  // value={formik.values.ImageAddress}
                onChange={formik.handleChange}

                  // onChange={(event) =>{
                  //   const file = event.currentTarget.files[0]; // فایل اول را بگیرید  
                  //   if (file) {  
                  //     formik.setFieldValue("ImageAddress", file); // فایل را به فرمیک بدهید  
                  //   }  
                  // }
                    // const file = event.target.files[0];
                    // console.log(file)
                    // if (file) {
                    //   const fileURL = URL.createObjectURL(file);
                    // console.log(typeof fileURL)

                    //   formik.handleChange(fileURL);
                    // }
                  // }
                  placeholder="عکس دوره"
                />
                <Label className="form-label" for="UniqeUrlString">
                  شناسه یکتا
                </Label>
                <Input
                  id="UniqeUrlString"
                  name="UniqeUrlString"
                  onChange={formik.handleChange}
                  value={formik.values.UniqeUrlString}
                  placeholder="شناسه یکتا"
                  invalid={formik.touched.UniqeUrlString && !!formik.errors.UniqeUrlString}
                />
                {formik.touched.UniqeUrlString && formik.errors.UniqeUrlString ? (
                  <div className="text-danger">{formik.errors.UniqeUrlString}</div>
                ) : null}
                {/* UniqeUrlString */}
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="Describe">
                  توضیحات دوره
                </Label>
                <Input
                  id="Describe"
                  placeholder="توضیحات دوره"
                  type="textarea"
                  name="Describe"
                  onChange={formik.handleChange}
                  value={formik.values.Describe}
                  style={{ minHeight: "70px", maxHeight: "140px" }}
                  invalid={formik.touched.Describe && !!formik.errors.Describe}
                />
                {formik.touched.Describe && formik.errors.Describe ? (
                  <div className="text-danger">{formik.errors.Describe}</div>
                ) : null}
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ویرایش
                </Button>
                <Button type="reset" color="secondary" outline onClick={toggle}>
                  لغو
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditCourse;
