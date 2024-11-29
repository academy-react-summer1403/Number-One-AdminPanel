import { useFormik } from "formik";
import { useEffect, useState } from "react";
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
import { EditClassFields } from "../../../@core/constants/class-manage/EditClassFields";
import { useMutation } from "@tanstack/react-query";
import { UpdateClassRome } from "../../../@core/services/api/put-api";
import { useQueryWithoutDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetBuildingList } from "../../../@core/services/api/get-api";

const EditClass = ({ isOpen, toggle, data, refetch }) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(EditClassFields(data));
  }, [data]);

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_CLASS"],
    mutationFn: (data) => {
      UpdateClassRome(data, refetch);
    },
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
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
          <h1 className="mb-1">ویرایش اطلاعات کلاس</h1>
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
                ظزفیت کلاس
              </Label>
              <Input
                id="capacity"
                placeholder="نام کلاس"
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
  );
};

export default EditClass;
