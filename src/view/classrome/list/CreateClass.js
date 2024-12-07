import { useFormik } from "formik";
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
import { useQueryWithoutDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetBuildingList } from "../../../@core/services/api/get-api";
import { useMutation } from "@tanstack/react-query";
import { CreateClassRome } from "../../../@core/services/api/post-api";
import ClassroomValidations from "../../../@core/validations/Classroom.Validations";

const CreateClass = ({ refetch, isOpen, toggle }) => {
  const initialValues = {
    classRoomName: "",
    capacity: 0,
    buildingId: "",
  };

  const { mutate } = useMutation({
    mutationKey: ["CREATE_CLASS"],
    mutationFn: (data) => {
      CreateClassRome(data, refetch);
    },
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    validationSchema: ClassroomValidations,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      mutate(values);
    },
  });

  const { data: buildings, isSuccess: buildingSuccess } =
    useQueryWithoutDependencies("GET_BUILDINGS", GetBuildingList);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-base"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">اضافه کردن کلاس</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="classRoomName">
                نام کلاس
              </Label>
              <Input
                id="classRoomName"
                placeholder="نام کلاس"
                name="classRoomName"
                onChange={formik.handleChange}
                value={formik.values.classRoomName}
                invalid={!!formik.errors.classRoomName}
              />
              <FormFeedback>{formik.errors.classRoomName}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="capacity">
                ظرفیت کلاس
              </Label>
              <Input
                id="capacity"
                placeholder="ظرفیت کلاس"
                name="capacity"
                onChange={formik.handleChange}
                value={formik.values.capacity}
                invalid={!!formik.errors.capacity}
              />
              <FormFeedback>{formik.errors.capacity}</FormFeedback>
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="buildingId">
                ساختمان
              </Label>
              <Input
                type="select"
                name="buildingId"
                id="buildingId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.buildingId}
                invalid={
                  formik.touched.buildingId && !!formik.errors.buildingId
                }
              >
                <option value="">انتخاب کنید</option>
                {buildingSuccess &&
                  buildings.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.buildingName}
                    </option>
                  ))}
              </Input>
              {formik.touched.buildingId && formik.errors.buildingId ? (
                <div className="text-danger">{formik.errors.buildingId}</div>
              ) : null}
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                ساختن
              </Button>
              <Button type="reset" color="secondary" outline onClick={toggle}>
                لغو
              </Button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CreateClass;
