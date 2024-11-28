// Style
import "@styles/react/libs/react-select/_react-select.scss";

// React Imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Formik
import { useFormik } from "formik";

// Reactstrap
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

// Query
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../utility/hooks/useCustomQuery";
import { useMutation } from "@tanstack/react-query";

// Api
import {
  GetProductCategoryList,
  GetProductsDetails,
  GetShopList,
} from "../../../@core/services/api/get-api";
import { UpdateProducts } from "../../../@core/services/api/put-api";

// Customize
import EditProductsFields from "../../../@core/constants/products-manage/EditProductsField";

const EditProducts = ({ isOpen, toggle, refetch }) => {
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();

  // Get Product Details
  const { data: productsDetail, isSuccess } = useQueryWithDependencies(
    "GET_NEWS_DETAILS",
    GetProductsDetails,
    id,
    id
  );

  // Get Shop List
  const { data: shops, isSuccess: shopSuccess } = useQueryWithoutDependencies(
    "GET_SHOPS",
    GetShopList
  );

  const { data: categories, isSuccess: categorySuccess } =
    useQueryWithoutDependencies("GET_CATEGORIES", GetProductCategoryList);

  // Handle Update Products
  const { mutate } = useMutation({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: (values) => {
      UpdateProducts(id, values, refetch);
    },
    onSuccess: () => {
      toggle();
    },
  });

  useEffect(() => {
    if (isSuccess === true) {
      setInitialValues(EditProductsFields(productsDetail));
    }
  }, [isSuccess]);

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">ویرایش اطلاعات این محصول</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="6" className="mb-1">
              <Label className="form-label" for="title">
                عنوان
              </Label>
              <Input
                id="title"
                placeholder="عنوان محصول"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                invalid={!!formik.errors.title}
              />
              <FormFeedback>{formik.errors.title}</FormFeedback>
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="googleTitle">
                عنوان گوگل
              </Label>
              <Input
                id="googleTitle"
                name="googleTitle"
                onChange={formik.handleChange}
                value={formik.values.googleTitle}
                invalid={!!formik.errors.googleTitle}
                placeholder="عنوان گوگل"
              />
              <FormFeedback>{formik.errors.googleTitle}</FormFeedback>
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="newsCatregoryId">
                انتخاب فروشگاه
              </Label>
              <Input
                id="shopId"
                name="shopId"
                type="select"
                onChange={formik.handleChange}
                placeholder="فروشگاه"
                defaultValue={formik.values.shopId}
              >
                {shopSuccess &&
                  shops?.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </option>
                  ))}
              </Input>
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="categoryId">
                انتخاب دسته بندی
              </Label>
              <Input
                id="categoryId"
                name="categoryId"
                type="select"
                onChange={formik.handleChange}
                placeholder="دسته بندی"
                defaultValue={formik.values.categoryId}
              >
                {categorySuccess &&
                  categories?.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.categoryName}
                    </option>
                  ))}
              </Input>
            </Col>
            <Col md="6">
              <Label className="form-label" for="miniDescribe">
                توضیح کوتاه
              </Label>
              <Input
                type="textarea"
                id="miniDiscribe"
                name="miniDiscribe"
                onChange={formik.handleChange}
                value={formik.values.miniDiscribe}
                placeholder="توضیح کوتاه"
              />
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="googleDescribe">
                توضیحات گوگل
              </Label>
              <Input
                type="textarea"
                id="googleDiscribe"
                name="googleDiscribe"
                onChange={formik.handleChange}
                value={formik.values.googleDiscribe}
                placeholder="توضیحات گوگل"
              />
            </Col>
            <Col md="2">
              <Label className="form-label" for="describe">
                تخفیف
              </Label>
              <Input
                type="number"
                id="discount"
                name="discount"
                onChange={formik.handleChange}
                value={formik.values.discount}
                placeholder="تخفیف"
              />
            </Col>
            <Col md="2" sm="12" className="mb-1">
              <Label className="form-label" for="special">
                فروش ویژه
              </Label>
              <Input
                type="select"
                name="special"
                id="special"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.special}
                invalid={formik.touched.special && !!formik.errors.special}
              >
                <option value="بله">بله</option>
                <option value="خیر">خیر</option>
              </Input>
            </Col>
            <Col md="2" className="mb-1">
              <Label className="form-label" for="keyword">
                موجودی در انبار
              </Label>
              <Input
                type="number"
                id="exist"
                name="exist"
                placeholder="موجودی در انبار"
                onChange={formik.handleChange}
                value={formik.values.exist}
                invalid={!!formik.errors.exist}
              />
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="keyword">
                قیمت
              </Label>
              <Input
                type="number"
                id="price"
                name="price"
                placeholder="قیمت"
                onChange={formik.handleChange}
                value={formik.values.price}
                invalid={!!formik.errors.price}
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

export default EditProducts;
