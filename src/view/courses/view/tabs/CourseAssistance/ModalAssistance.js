import { Fragment, useEffect, useState } from "react";
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
import { EditAssistanceFields } from "../../../../../@core/constants/courses/CourseAssistanceTable";
import { useFormik } from "formik";
import { useQueryWithDependencies } from "../../../../../utility/hooks/useCustomQuery";
import {
  GetCourseById,
  GetCourses,
  GetUserList,
  UserDetails,
} from "../../../../../@core/services/api/get-api";
import ModalApiItemList from "../../../../../@core/components/modal/ModalApiItemList";
import { useSelector } from "react-redux";
import {
  handlePageNumber,
  handleQuery,
} from "../../../../user/store/FilterSlice";
import UserTableItems from "./UserTableItems";
import {
  handleCoursePageNumber,
  handleQueryCourse,
} from "../../../store/CourseList";
import CourseTableItems from "./CourseTableItems";
import { useMutation } from "@tanstack/react-query";
import { UpdateCourseAssistance } from "../../../../../@core/services/api/put-api";
import { CreateCourseAssistance } from "../../../../../@core/services/api/post-api";

const ModalAssistance = ({
  toggle,
  isOpen,
  data,
  refetch,
  courseId,
  section,
}) => {
  const [initialValues, setInitialValues] = useState([]);
  const userParams = useSelector((state) => state.FilterSlice);
  const courseParams = useSelector((state) => state.CoursesList);
  const [userid, setUserId] = useState(initialValues?.userId);
  const [courseid, setCourseId] = useState(initialValues?.courseId);

  useEffect(() => {
    setInitialValues(EditAssistanceFields(data));
  }, [data]);

  const { mutate: update } = useMutation({
    mutationKey: ["UPDATE_ASSISTANCE"],
    mutationFn: (data) => {
      UpdateCourseAssistance(data, refetch);
    },
  });

  const { mutate: create } = useMutation({
    mutationKey: ["CREATE_ASSISTANCE"],
    mutationFn: (data) => {
      CreateCourseAssistance(data, refetch);
    },
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (section === "create") {
        create(values);
      } else if (section === "update") {
        update(values);
      }
    },
  });

  const { data: course } = useQueryWithDependencies(
    "GET_COURSE_DETAILS",
    GetCourseById,
    courseid ? courseid : courseId,
    courseid ? courseid : courseId
  );

  const { data: user } = useQueryWithDependencies(
    "GET_USER_DETAILS",
    UserDetails,
    userid ? userid : initialValues?.userId,
    userid ? userid : initialValues?.userId
  );

  // Get All Users
  const { data: users } = useQueryWithDependencies(
    "GET_USER_LIST",
    GetUserList,
    userParams,
    userParams
  );

  // Get All Users
  const { data: courses } = useQueryWithDependencies(
    "GET_COURSE_LIST",
    GetCourses,
    courseParams,
    { ...courseParams, RowsOfPage: 6 }
  );

  const userTableHeader = ["", "نام کاربر", "ایمیل کاربر", "عملیات"];
  const courseTableHeader = ["", "نام دوره", "وضعیت", "عملیات"];

  // Choose User Modal
  const [chooseUserModal, setChooseUserModal] = useState(false);
  const toggleChooseUserModal = () => setChooseUserModal(!chooseUserModal);
  // Choose Course Modal
  const [chooseCourseModal, setChooseCourseModal] = useState(false);
  const toggleChooseCourseModal = () =>
    setChooseCourseModal(!chooseCourseModal);

  useEffect(() => {
    if (userid != undefined) {
      formik.setFieldValue("userId", userid);
    }
    if (courseid != undefined) {
      formik.setFieldValue("courseId", courseid);
    } else if (courseid == undefined) {
      formik.setFieldValue("courseId", courseId);
    }
  }, [userid, courseid]);

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-dialog-centered modal-base"
      >
        <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{section === "create" ? "ساخت منتور" : "ویرایش منتور"}</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              <Col md="12" className="mb-1">
                <Label className="form-label" for="userId">
                  منتور
                </Label>
                <Input
                  id="userId"
                  placeholder="نام منتور"
                  name="userId"
                  onClick={toggleChooseUserModal}
                  value={
                    user?.fName || user?.lName
                      ? user?.fName + " " + user?.lName
                      : ""
                  }
                  invalid={!!formik.errors.userId}
                />
                <FormFeedback>{formik.errors.userId}</FormFeedback>
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="courseId">
                  دوره
                </Label>
                <Input
                  id="courseId"
                  placeholder="نام دوره"
                  name="courseId"
                  onClick={toggleChooseCourseModal}
                  value={course?.title}
                  invalid={!!formik.errors.courseId}
                />
                <FormFeedback>{formik.errors.courseId}</FormFeedback>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  {section === "create" ? "ساختن" : "ویرایش"}
                </Button>
                <Button type="reset" color="secondary" outline onClick={toggle}>
                  لغو
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <ModalApiItemList
        PageNumber={userParams.PageNumber}
        RowsOfPage={userParams.RowsOfPage}
        isOpen={chooseUserModal}
        toggle={toggleChooseUserModal}
        handlePageNumber={handlePageNumber}
        handleQuery={handleQuery}
        modalTitle={"منتور را انتخاب کنید"}
        totalCount={users?.totalCount}
        headerTitles={userTableHeader}
      >
        {users?.listUser?.map((item, index) => (
          <UserTableItems
            item={item}
            toggle={toggleChooseUserModal}
            key={index}
            setId={setUserId}
          />
        ))}
      </ModalApiItemList>
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
    </Fragment>
  );
};

export default ModalAssistance;
