import { useFormik } from "formik";
import { Col, Form, Input, Label, Row } from "reactstrap";

// Api
import { GetNewsCategory } from "../../../../@core/services/api/get-api";

// Query
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import ButtonsForMove from "../../../../@core/components/button-for-move/ButtonsForMove";
import CreateNewsValidations from "../../../../@core/validations/CreateNews.Validation";
import { handleSetInfo } from "../../store/CreateNews";
import { useDispatch } from "react-redux";

const NewsInfo = ({ stepper }) => {
  const dispatch = useDispatch();

  const { data: newsCategory, isSuccess: successGetNewsCat } =
    useQueryWithoutDependencies("GET_NEWS_CATEGORY", GetNewsCategory);

  const initialValues = {
    Title: "",
    GoogleTitle: "",
    GoogleDescribe: "",
    MiniDescribe: "",
    Keyword: "",
    NewsCatregoryId: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CreateNewsValidations,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(handleSetInfo(values));
      console.log(values);
      stepper.next();
      setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col md="6" sm="12" className="">
          <Label className="form-label" for="Title">
            عنوان خبر
          </Label>
          <Input
            type="text"
            name="Title"
            id="Title"
            placeholder="تیتر"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Title}
            invalid={formik.touched.Title && !!formik.errors.Title}
          />
          {formik.touched.Title && formik.errors.Title ? (
            <div className="text-danger">{formik.errors.Title}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="GoogleTitle">
            عنوان گوگل
          </Label>
          <Input
            type="text"
            name="GoogleTitle"
            id="GoogleTitle"
            placeholder="لینک"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.GoogleTitle}
            invalid={formik.touched.GoogleTitle && !!formik.errors.GoogleTitle}
          />
          {formik.touched.GoogleTitle && formik.errors.GoogleTitle ? (
            <div className="text-danger">{formik.errors.GoogleTitle}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="GoogleDescribe">
            توضیحات گوگل
          </Label>
          <Input
            type="textarea"
            name="GoogleDescribe"
            id="GoogleDescribe"
            placeholder="توضیحات"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.GoogleDescribe}
            invalid={
              formik.touched.GoogleDescribe && !!formik.errors.GoogleDescribe
            }
          />
          {formik.touched.GoogleDescribe && formik.errors.GoogleDescribe ? (
            <div className="text-danger">{formik.errors.GoogleDescribe}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="MiniDescribe">
            توضیح کوتاه
          </Label>
          <Input
            type="textarea"
            name="MiniDescribe"
            id="MiniDescribe"
            placeholder=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.MiniDescribe}
            invalid={
              formik.touched.MiniDescribe && !!formik.errors.MiniDescribe
            }
          />
          {formik.touched.MiniDescribe && formik.errors.MiniDescribe ? (
            <div className="text-danger">{formik.errors.MiniDescribe}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="Keyword">
            کلمات کلیدی
          </Label>
          <Input
            type="text"
            name="Keyword"
            id="Keyword"
            placeholder="کلیدی"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Keyword}
            invalid={formik.touched.Keyword && !!formik.errors.Keyword}
          />
          {formik.touched.Keyword && formik.errors.Keyword ? (
            <div className="text-danger">{formik.errors.Keyword}</div>
          ) : null}
        </Col>
        <Col md="6" sm="12" className="mb-1">
          <Label className="form-label" for="NewsCatregoryId">
            دسته بندی خبر
          </Label>
          <Input
            type="select"
            name="NewsCatregoryId"
            id="NewsCatregoryId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.NewsCatregoryId}
            invalid={
              formik.touched.NewsCatregoryId && !!formik.errors.NewsCatregoryId
            }
          >
            <option value="">انتخاب کنید</option>
            {successGetNewsCat &&
              newsCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
          </Input>
          {formik.touched.NewsCatregoryId && formik.errors.NewsCatregoryId ? (
            <div className="text-danger">{formik.errors.NewsCatregoryId}</div>
          ) : null}
        </Col>
        <Col xs={12}>
          <ButtonsForMove stepper={stepper} form={false} />
        </Col>
      </Row>
    </Form>
  );
};

export default NewsInfo;
