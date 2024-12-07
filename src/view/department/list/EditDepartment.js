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
import { useEffect, useState } from "react";
import { EditDepartmentFields } from "../../../@core/constants/department-manage/EditDepartmentFields";
import { useMutation } from "@tanstack/react-query";
import { UpdateDepartment } from "../../../@core/services/api/put-api";
import DepartmentValidations from "../../../@core/validations/Department.Validation";

const EditDepartment = ({ data, refetch, isOpen, toggle }) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(EditDepartmentFields(data));
  }, [data]);

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_DEPARTMENT"],
    mutationFn: (data) => {
      UpdateDepartment(data, refetch);
    },
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    validationSchema: DepartmentValidations,
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
          <h1 className="mb-1">ویرایش اطلاعات بخش</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="depName">
                نام بخش
              </Label>
              <Input
                id="depName"
                placeholder="نام بخش"
                name="depName"
                onChange={formik.handleChange}
                value={formik.values.depName}
                invalid={!!formik.errors.depName}
              />
              <FormFeedback>{formik.errors.depName}</FormFeedback>
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

export default EditDepartment;
