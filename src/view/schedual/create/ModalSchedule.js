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

import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateSchedule } from "../../../@core/services/api/post-api";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import ScheduleValidation from "../../../@core/validations/Schedule.Validation";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import DateObject from "react-date-object";
import { ScheduleNumberFields } from "../../../@core/constants/schedual";
import ModalApiItemList from "../../../@core/components/modal/ModalApiItemList";
import CourseTableItems from "../../courses/view/tabs/CourseAssistance/CourseTableItems";
import { useSelector } from "react-redux";
import {
  GetCourseById,
  GetCourseGroups,
  GetCourses,
} from "../../../@core/services/api/get-api";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import {
  handleCoursePageNumber,
  handleQueryCourse,
} from "../../courses/store/CourseList";
const ModalSchedule = ({ showModal, toggle, data, refetch, variantState }) => {
  const [courseId, setCourseId] = useState(undefined);
  const courseParams = useSelector((state) => state.CoursesList);
  const courseTableHeader = ["", "نام دوره", "وضعیت", "عملیات"];

  const titleVariant = {
    create: "افزودن بازه زمانی جدید ",
    update: "ویرایش بازه زمانی",
  };

  // Get All Users
  const { data: courses } = useQueryWithDependencies(
    "GET_COURSE_LIST",
    GetCourses,
    courseParams,
    { ...courseParams, RowsOfPage: 6 }
  );
  // Get course detail
  const { data: course } = useQueryWithDependencies(
    "GET_COURSE_DETAILS",
    GetCourseById,
    courseId,
    courseId,
    courseId !== undefined
  );
  // Get course Groups
  const { data: groupData, refetch: refetchGroup } = useQuery({
    queryKey: ["GET_COURSE_GROUPS", courseId],
    queryFn: () => {
      return GetCourseGroups({
        teacherId: course?.teacherId,
        courseId: course?.courseId,
      });
    },
    enabled: !!(course?.teacherId !== undefined),
  });
  console.log(groupData);

  // Creating categories for blogs
  const { mutate: AddSchedule } = useMutation({
    mutationKey: ["CREATE_SCHEDULE"],
    mutationFn: (values) => {
      CreateSchedule(courseId, values, refetch);
    },
    onSuccess: () => toggle(),
  });
  //   console.log(data)

  // Convert date to jalali and send to api
  const [startValue, setStartValue] = useState(new Date());

  // Editing categories for blogs
  //   const { mutate: updateMutate } = useMutation({
  //     mutationKey: ["UPDATE_LEVEL"],
  //     mutationFn: (values) => {
  //       UpdateCourseLevel(values, refetch);
  //     },
  //     onSuccess: () => setShowModal(!showModal),
  //   });
  // initialValues
  //   console.log(data.levelName);
  const initialValues = {
    // courseGroupId: variantState == "update" ? data.courseGroupId : "",
    courseGroupId: variantState == "update" ? data?.courseGroupId : "",
    startTime: variantState == "update" ? data?.startTime : "",
    endTime: variantState == "update" ? data?.endTime : "",
    weekNumber: variantState == "update" ? data?.weekNumber : "",
    rowEffect: variantState == "update" ? data?.rowEffect : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ScheduleValidation,
    onSubmit: async (values, { setSubmitting }) => {
      alert();
      console.log(variantState);
      if (variantState == "create") {
        console.log(values);
        AddSchedule(values);
      } else {
        // updateMutate(Object.assign(values, { id: data.id }));
      }
      setSubmitting(false);
    },
  });

  const handleDatePicker = (date) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-M-DT00:00:00");
    formik.setFieldValue("startDate", gregorianDate);
    setStartValue(date);
  };

  // Choose Course Modal
  const [chooseCourseModal, setChooseCourseModal] = useState(false);
  const toggleChooseCourseModal = () =>
    setChooseCourseModal(!chooseCourseModal);

  return (
    <div className="vertically-centered-modal ">
      <Modal
        className="modal-dialog-centered modal-lg"
        isOpen={showModal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
          {titleVariant?.[variantState]}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm="6" xs="12" className="mb-1">
                <Label className="form-label" for="courseId">
                  انتخاب دوره
                </Label>
                <Input
                  // id="courseId"
                  placeholder="نام دوره"
                  // name="courseId"
                  onClick={toggleChooseCourseModal}
                  value={course?.title}
                  // invalid={!!formik.errors.courseId}
                />
                {/* <FormFeedback>{formik.errors.courseId}</FormFeedback> */}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="courseGroupId">
                  گروه دوره
                </Label>
                <Input
                  type="select"
                  name="courseGroupId"
                  id="courseGroupId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.courseGroupId}
                  invalid={
                    formik.touched.courseGroupId &&
                    !!formik.errors.courseGroupId
                  }
                >
                  {/* <option value="">انتخاب کنید</option> */}
                  {groupData?.length > 0 ? (
                    groupData.map((group, index) => (
                      <option key={index} value={group.groupId}>
                        {group.groupName}
                      </option>
                    ))
                  ) : groupData?.length == 0 ? (
                    <option>گروهی برای این دوره وجود ندارد</option>
                  ) : (
                    <option>ابتدا گروه را انتخاب نمایید</option>
                  )}
                </Input>
                {formik.touched.courseGroupId && formik.errors.courseGroupId ? (
                  <div className="text-danger">
                    {formik.errors.courseGroupId}
                  </div>
                ) : null}
              </Col>
              <Col sm="6" xs="12" className="mb-1">
                <Label className="form-label" for="startDate">
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
                  onChange={(date) => handleDatePicker(date)}
                  style={{
                    width: "100%",
                    height: "39px",
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  }}
                  className="datePicker"
                />
              </Col>
              {ScheduleNumberFields.map((field, index) => (
                <Col sm="3" xs="6" className="mb-1" key={index}>
                  <Label className="form-label" for={field.value}>
                    {field.label}
                  </Label>
                  <Input
                    type="number"
                    name={field.value}
                    id={field.value}
                    placeholder={field.label}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.[field.value]}
                    invalid={
                      formik.touched?.[field.value] &&
                      !!formik.errors?.[field.value]
                    }
                  />
                  {formik.touched?.[field.value] &&
                  formik.errors?.[field.value] ? (
                    <div className="text-danger">
                      {formik.errors?.[field.value]}
                    </div>
                  ) : null}
                </Col>
              ))}
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
      <ModalApiItemList
        PageNumber={courseParams.PageNumber}
        RowsOfPage={courseParams.RowsOfPage}
        isOpen={chooseCourseModal}
        toggle={toggleChooseCourseModal}
        handlePageNumber={handleCoursePageNumber}
        handleQuery={handleQueryCourse}
        modalTitle={"دوره را انتخاب کنید"}
        totalCount={courses?.totalCount}
        headerTitles={courseTableHeader}
      >
        {courses?.courseDtos?.map((item, index) => (
          <CourseTableItems
            item={item}
            toggle={toggleChooseCourseModal}
            key={index}
            setId={setCourseId}
          />
        ))}
      </ModalApiItemList>
    </div>
  );
};

export default ModalSchedule;
