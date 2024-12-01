import { Fragment } from "react";
import { Col, Row } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { GetProductCategoryList } from "../../../../@core/services/api/get-api";
import { StatisticsOfProductCategory } from "../../../../@core/constants/products-manage/Options";
import ListHeader from "../../../../@core/components/products-list/ListHeader";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import { handleQuery, handleRowsOfPage } from "../store/ProductCategoryList";

const ProductCategoryWrapper = () => {
  // getting data from Api with use Query
  const {
    data: productCategoriesData,
    // isSuccess: successGetCategories,
  } = useQueryWithoutDependencies(
    "GET_PRODUCT_CATEGORIES",
    GetProductCategoryList
  );

  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={productCategoriesData}
            statisticsData={StatisticsOfProductCategory}
            resize="12"
          />
        </Col>
        <Col md={9} xs={12}>
          <div>
            <Row>
              <Col className="pt-2">
                <ListHeader
                  rowsFunc={handleRowsOfPage}
                  styleDisplay={"hidden"}
                  colWidth={"6"}
                />
              </Col>
              <Col>
                <ListSearchbar
                  QueryFunction={handleQuery}
                  width={"mb-1 w-100"}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductCategoryWrapper;
