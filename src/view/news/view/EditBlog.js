// Style
import "@styles/react/libs/react-select/_react-select.scss";

// React Imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Formik
import { useFormik } from "formik";

// Reactstrap Imports
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

// React Query
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../utility/hooks/useCustomQuery";
import { useMutation } from "@tanstack/react-query";

// Api
import {
  GetNewsCategory,
  GetNewsDetail,
} from "../../../@core/services/api/get-api";
import { UpdateNews } from "../../../@core/services/api/put-api";

// Redux
import { useDispatch } from "react-redux";

// Constants
import EditNewsFields from "../../../@core/constants/news-manage/EditNewsField";

const EditBlog = ({ isOpen, toggle, refetch }) => {
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: newsCategory, isSuccess: successGetNewsCat } =
    useQueryWithoutDependencies("GET_NEWS_CATEGORY", GetNewsCategory);

  const {
    data: newsDetail,
    isSuccess,
    isError,
  } = useQueryWithDependencies("GET_NEWS_DETAILS", GetNewsDetail, id, id);

  console.log(newsDetail)

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_NEWS"],
    mutationFn: (values) => {
      UpdateNews(values, refetch);
    },
    onSuccess: () => {
      toggle();
    },
  });

  useEffect(() => {
    if (isSuccess === true) {
      setInitialValues(EditNewsFields(newsDetail?.detailsNewsDto));
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
          <h1 className="mb-1">ویرایش اطلاعات این خبر</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="5" className="mb-1">
              <Label className="form-label" for="title">
                عنوان
              </Label>
              <Input
                id="title"
                placeholder="عنوان خبر"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                invalid={!!formik.errors.title}
              />
              <FormFeedback>{formik.errors.title}</FormFeedback>
            </Col>
            <Col md="7" className="mb-1">
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
              <Label className="form-label" for="keyword">
                کلمات کلیدی
              </Label>
              <Input
                id="keyword"
                name="keyword"
                placeholder="کلمات کلیدی"
                onChange={formik.handleChange}
                value={formik.values.keyword}
                invalid={!!formik.errors.keyword}
              />
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="newsCatregoryId">
                انتخاب دسته بندی
              </Label>
              <Input
                id="newsCatregoryId"
                name="newsCatregoryId"
                type="select"
                onChange={formik.handleChange}
                placeholder=" دسته بندی"
                defaultValue={
                  isSuccess && newsDetail?.detailsNewsDto?.newsCatregoryId
                }
              >
                {successGetNewsCat &&
                  newsCategory?.map((classItem) => (
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
                id="miniDescribe"
                name="miniDescribe"
                onChange={formik.handleChange}
                value={formik.values.miniDescribe}
                placeholder="توضیح کوتاه"
              />
            </Col>
            <Col md="6">
              <Label className="form-label" for="describe">
                توضیحات
              </Label>
              <Input
                id="describe"
                name="describe"
                onChange={formik.handleChange}
                value={formik.values.describe}
                placeholder="توضیحات"
              />
            </Col>
            <Col md="7" className="mb-1">
              <Label className="form-label" for="googleDescribe">
                توضیحات گوگل
              </Label>
              <Input
                id="googleDescribe"
                name="googleDescribe"
                onChange={formik.handleChange}
                value={formik.values.googleDescribe}
                placeholder="توضیحات گوگل"
              />
            </Col>
            <Col md="5" className="mb-1">
              <Label className="form-label" for="currentImageAddress">
                آپلود عکس
              </Label>
              <Input
                id="currentImageAddress"
                type="file"
                name="currentImageAddress"
                onChange={formik.handleChange}
                value={formik.values.currentImageAddress}
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

export default EditBlog;
