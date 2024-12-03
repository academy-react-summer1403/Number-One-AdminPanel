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
  CardBody,
} from "reactstrap";

import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateSchedule } from "../../../@core/services/api/post-api";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import ScheduleValidation from "../../../@core/validations/Schedule.Validation";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useState } from "react";
import DateObject from "react-date-object";
import { ScheduleNumberFields } from "../../../@core/constants/schedual";
import ModalApiItemList from "../../../@core/components/modal/ModalApiItemList";
import CourseTableItems from "../../courses/view/tabs/CourseAssistance/CourseTableItems";
import { useSelector } from "react-redux";
import {
  GetCourseById,
  GetCourseGroups,
  GetCourses,
  GetGroupDetails,
} from "../../../@core/services/api/get-api";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import {
  handleCoursePageNumber,
  handleQueryCourse,
} from "../../courses/store/CourseList";
import { UpdateSchedule } from "../../../@core/services/api/put-api";
const ModalSchedule = ({ showModal, toggle, data, refetch, variantState }) => {
  // states & params
  const [courseId, setCourseId] = useState(undefined);
  const courseParams = useSelector((state) => state.CoursesList);
  const courseTableHeader = ["", "نام دوره", "وضعیت", "عملیات"];

  // Variants
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
  // Get Group details
  const { data: groupDetails, isSuccess } = useQueryWithDependencies(
    "GET_GROUP_DETAILS",
    GetGroupDetails,
    data?.courseGroupId,
    data?.courseGroupId,
    data?.courseGroupId !== undefined
  );

  useEffect(() => {
    if (isSuccess) setCourseId(groupDetails?.courseGroupDto?.courseId);
  }, [isSuccess]);

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

  // Creating schedule
  const { mutate: AddSchedule } = useMutation({
    mutationKey: ["CREATE_SCHEDULE"],
    mutationFn: (values) => {
      CreateSchedule(courseId, values, refetch);
    },
    onSuccess: () => toggle(),
  });

  // Editing schedule
  const { mutate: updateMutate } = useMutation({
    mutationKey: ["UPDATE_SCHEDULE"],
    mutationFn: (values) => {
      UpdateSchedule(courseId, values, refetch);
    },
    onSuccess: () => toggle(),
  });

  // initialValues
  const initialValues = {
    courseGroupId: variantState == "update" ? data?.courseGroupId : "",
    startDate: variantState == "update" ? data?.startDate : "",
    startTime: variantState == "update" ? data?.startTime : "",
    endTime: variantState == "update" ? data?.endTime : "",
    weekNumber: variantState == "update" ? data?.weekNumber : "",
    rowEffect: variantState == "update" ? data?.rowEffect : "",
    forming: variantState == "update" ? data?.forming : "",
    lockToRaise: variantState == "update" ? data?.lockToRaise : "",
  };
  // use Formik
  const formik = useFormik({
    initialValues,
    validationSchema: ScheduleValidation,
    onSubmit: async (values, { setSubmitting }) => {
      if (variantState == "create") {
        // console.log(values);
        AddSchedule(values);
      } else {
        updateMutate(Object.assign(values, { id: data?.id }));
      }
      setSubmitting(false);
    },
  });

  // Convert Gregorian date to solar
  const handleDatePicker = (date) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDT00:00:00");
    formik.setFieldValue("startDate", gregorianDate);
    // setStartValue(date);
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
                  placeholder="نام دوره"
                  onClick={toggleChooseCourseModal}
                  value={course?.title}
                />
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
                  value={formik.values.startDate}
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
              {data && (
                <Col sm="6">
                  <CardBody className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-1 mt-1">
                      <Label
                        className="form-switch form-check-success"
                        for="forming"
                      >
                        حالت برگزاری کلاس
                      </Label>
                      <div className="form-switch form-check-success">
                        <Input
                          type="switch"
                          name="forming"
                          id="forming"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.forming}
                          invalid={
                            formik.touched.forming && !!formik.errors.forming
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-1 mt-1">
                      <Label
                        className="form-switch form-check-success"
                        for="lockToRaise"
                      >
                        وضعیت حضور و غیاب
                      </Label>
                      <div className="form-switch form-check-success">
                        <Input
                          type="switch"
                          name="lockToRaise"
                          id="lockToRaise"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.lockToRaise}
                          invalid={
                            formik.touched.lockToRaise &&
                            !!formik.errors.lockToRaise
                          }
                        />
                      </div>
                    </div>
                  </CardBody>
                </Col>
              )}
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
