import { useFormik } from "formik";
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
import { EditAssWorkFields } from "../../../@core/constants/assistance-work/EditBuildingFields";
import DateObject from "react-date-object";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../utility/hooks/useCustomQuery";
import {
  GetCourseAssistance,
  GetCourseAssistanceDetails,
  GetUserList,
  UserDetails,
} from "../../../@core/services/api/get-api";
import ChangeMoment from "../../../utility/moment";
import ModalApiItemList from "../../../@core/components/modal/ModalApiItemList";
import UserTableItems from "../../courses/view/tabs/CourseAssistance/UserTableItems";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { UpdateAssistanceWork } from "../../../@core/services/api/put-api";
import {
  handleData,
  handlePageNumber,
  handleQuery,
} from "../../courses/store/AssistanceCourseSlice";
import AssWorkTableItems from "./AssWorkTableItems";
import { CreateAssistanceWork } from "../../../@core/services/api/post-api";

const ModalTask = ({ isOpen, toggle, data, refetch, section }) => {
  const [initialValues, setInitialValues] = useState({});
  const [assistanceid, setAssistanceId] = useState(initialValues?.assistanceId);
  const AssistanceCourseSlice = useSelector(
    (state) => state.AssistanceCourseSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setInitialValues(EditAssWorkFields(data));
  }, [data]);

  const { mutate: update } = useMutation({
    mutationKey: ["UPDATE_ASSISTANCE_WORK"],
    mutationFn: (data) => {
      UpdateAssistanceWork(data, refetch);
    },
  });

  const { mutate: create } = useMutation({
    mutationKey: ["CREATE_ASSISTANCE_WORK"],
    mutationFn: (data) => {
      CreateAssistanceWork(data, refetch);
    },
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (section === "update") {
        update(values);
      } else {
        create(values);
      }
    },
  });

  // Get All Assistance Course
  const { data: assCourse, isSuccess } = useQueryWithoutDependencies(
    "GET_ASS_COURSE_LIST",
    GetCourseAssistance
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleData(assCourse));
    }
  }, [isSuccess]);

  const { data: assDetails } = useQueryWithDependencies(
    "GET_ASS_COURSE_DETAILS",
    GetCourseAssistanceDetails,
    assistanceid ? assistanceid : initialValues?.assistanceId,
    assistanceid ? assistanceid : initialValues?.assistanceId
  );

  const courseTableHeader = ["نام دوره", "منتور", "تاریخ ایجاد", "عملیات"];

  const handleDatePicker = (date) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDTHH:mm:ss");
    formik.setFieldValue("workDate", gregorianDate);
  };

  // Choose User Modal
  const [chooseUserModal, setChooseUserModal] = useState(false);
  const toggleChooseUserModal = () => setChooseUserModal(!chooseUserModal);

  useEffect(() => {
    if (assistanceid != undefined) {
      console.log(assistanceid);
      formik.setFieldValue("assistanceId", assistanceid);
    }
  }, [assistanceid]);

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
            <h1 className="mb-1">
              {section === "update" ? "ویرایش تسک" : "ساخت تسک"}
            </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              <Col md="12" className="mb-1">
                <Label className="form-label" for="worktitle">
                  نام تسک
                </Label>
                <Input
                  id="worktitle"
                  placeholder="نام تسک"
                  name="worktitle"
                  onChange={formik.handleChange}
                  value={formik.values.worktitle}
                  invalid={!!formik.errors.worktitle}
                />
                <FormFeedback>{formik.errors.worktitle}</FormFeedback>
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="workDescribe">
                  توضیحات تسک
                </Label>
                <Input
                  id="workDescribe"
                  placeholder="توضیحات تسک"
                  name="workDescribe"
                  onChange={formik.handleChange}
                  value={formik.values.workDescribe}
                  invalid={!!formik.errors.workDescribe}
                />
                <FormFeedback>{formik.errors.workDescribe}</FormFeedback>
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="assistanceId">
                  منتور
                </Label>
                <Input
                  id="assistanceId"
                  placeholder="منتور"
                  name="assistanceId"
                  onClick={toggleChooseUserModal}
                  value={assDetails?.courseAssistanceDto?.courseName}
                  invalid={!!formik.errors.assistanceId}
                />
                <FormFeedback>{formik.errors.assistanceId}</FormFeedback>
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="workDate">
                  تایم تسک
                </Label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  containerStyle={{
                    width: "100%",
                  }}
                  format="YYYY/MM/DD"
                  onChange={handleDatePicker}
                  style={{
                    width: "100%",
                    height: "39px",
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  }}
                  className="datePicker"
                  value={ChangeMoment(
                    formik.values.workDate,
                    "YYYY/MM/DD",
                    "persian"
                  )}
                />
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  {section === "update" ? "ویرایش" : "ساختن"}
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
        PageNumber={AssistanceCourseSlice.PageNumber}
        RowsOfPage={AssistanceCourseSlice.RowsOfPage}
        isOpen={chooseUserModal}
        toggle={toggleChooseUserModal}
        handlePageNumber={handlePageNumber}
        handleQuery={handleQuery}
        modalTitle={"دوره را انتخاب کنید"}
        totalCount={AssistanceCourseSlice.FilteredData?.length}
        headerTitles={courseTableHeader}
      >
        {AssistanceCourseSlice.FilteredData?.map((item, index) => (
          <AssWorkTableItems
            item={item}
            toggle={toggleChooseUserModal}
            key={index}
            setId={setAssistanceId}
          />
        ))}
      </ModalApiItemList>
    </Fragment>
  );
};

export default ModalTask;
