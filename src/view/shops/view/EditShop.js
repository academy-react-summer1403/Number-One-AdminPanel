import { useMutation } from "@tanstack/react-query";
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
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { EditShopFields } from "../../../@core/constants/shops";
import { UpdateShop } from "../../../@core/services/api/put-api";
import { useQueryWithoutDependencies } from "../../../utility/hooks/useCustomQuery";
import GetShopCategories from "../../../@core/services/api/get-api/GetShopCategories";

const EditShop = ({ data, isOpen, toggle, refetch, validation }) => {
  const [initialValues, setInitialValues] = useState({});

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_SHOP"],
    mutationFn: (values) => {
      // console.log(data.id, values);
      UpdateShop(data.id, values, refetch);
    },
    onSuccess: () => {
      toggle();
      refetch();
    },
  });

  useEffect(() => {
    setInitialValues(EditShopFields(data));
  }, [data]);

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    // validationSchema: validation,
    onSubmit: (values) => {
      // console.log(values)
      mutate(values);
    },
  });

  const { data: shopsCategory, isSuccess: shopSuccess } = useQueryWithoutDependencies(
    "GET_SHOPS_CATEGORY",
    GetShopCategories
  );

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1"> ویرایش مشخصات فروشگاه</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="6" className="mb-1">
              <Label className="form-label" for="name">
                عنوان
              </Label>
              <Input
                id="name"
                placeholder="عنوان فروشگاه"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                invalid={formik.touched.name && !!formik.errors.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </Col>
            {/* <Col md="6" className="mb-1">
              <Label className="form-label" for="category">
                دسته بندی
              </Label>
              <Input
                id="category"
                placeholder="دسته بندی محصولات"
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
                invalid={formik.touched.category && !!formik.errors.category}
              />
              {formik.touched.category && formik.errors.category ? (
                <div className="text-danger">{formik.errors.category}</div>
              ) : null}
            </Col> */}
            <Col sm="6" className="mb-1">
        <Label className="form-label" for="categoryId">
            دسته بندی
          </Label>
          <Input
            type="select"
            name="categoryId"
            id="categoryId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryId}
            invalid={formik.touched.categoryId && !!formik.errors.categoryId}
          >
            <option value="">انتخاب کنید</option>
            {shopSuccess &&
              shopsCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
          </Input>
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className="text-danger">{formik.errors.categoryId}</div>
          ) : null}
        </Col>
            <Col md="6">
              <Label className="form-label" for="address">
                آدرس
              </Label>
              <Input
                id="address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                placeholder="آدرس فروشگاه"
                invalid={formik.touched.address && !!formik.errors.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-danger">{formik.errors.address}</div>
              ) : null}
            </Col>
            <Col md="3">
              <Label className="form-label" for="startTime">
                شروع ارسال
              </Label>
              <Input
                id="startTime"
                name="startTime"
                onChange={formik.handleChange}
                value={formik.values.startTime}
                placeholder="ساعت شروع"
                invalid={formik.touched.startTime && !!formik.errors.startTime}
              />
              {formik.touched.startTime && formik.errors.startTime ? (
                <div className="text-danger">{formik.errors.startTime}</div>
              ) : null}
            </Col>
            <Col md="3">
              <Label className="form-label" for="endTime">
                پایان ارسال
              </Label>
              <Input
                id="endTime"
                name="endTime"
                onChange={formik.handleChange}
                value={formik.values.endTime}
                placeholder="ساعت پایان"
                invalid={formik.touched.endTime && !!formik.errors.endTime}
              />
              {formik.touched.endTime && formik.errors.endTime ? (
                <div className="text-danger">{formik.errors.endTime}</div>
              ) : null}
            </Col>
            <Col md="12">
              <Label className="form-label" for="aboutUs">
                توضیحات
              </Label>
              <Input
                id="aboutUs"
                name="aboutUs"
                type="textarea"
                onChange={formik.handleChange}
                value={formik.values.aboutUs}
                invalid={formik.touched.endTime && !!formik.errors.aboutUs}
                placeholder="درباره فروشگاه"
                style={{
                  maxHeight: "140px",
                  height: "140px",
                  minHeight: "80px",
                }}
              />
               {formik.touched.aboutUs && formik.errors.aboutUs ? (
                <div className="text-danger">{formik.errors.aboutUs}</div>
              ) : null}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="img">
                آپلود عکس
              </Label>
              <Input
                id="img"
                type="file"
                name="img"
                onChange={formik.handleChange}
                placeholder="آپلود عکس"
              />
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

export default EditShop;
