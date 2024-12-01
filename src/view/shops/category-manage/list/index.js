import { Fragment } from "react";
import { Col, Row } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { useQueryWithDependencies, useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import {
  GetShopCategories,
  GetShopCategoriesList,
} from "../../../../@core/services/api/get-api";
import { StatisticsOfShopCategory } from "../../../../@core/constants/shops/ShopCategories";
import ListHeader from "../../../../@core/components/products-list/ListHeader";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import { useSelector } from "react-redux";
import { handleQuery, handleRowsOfPage } from "../store/ShopCategoryList";

const ShopCategoriesWrapper = () => {
  // redux Params
  const categoriesParams = useSelector((state) => state.ShopCategoryList);
  const { PageNumber, RowsOfPage, Query } = useSelector(
    (state) => state.ShopCategoryList
  );
  // getting data from Api with use Query
  const {
    data: shopCategoriesData,
    // isSuccess: successGetCategories,
  } = useQueryWithoutDependencies("GET_SHOP_CATEGORIES", GetShopCategories);

  // getting data from Api with use Query with dependency
  const {
    data: shopCategoriesList,
    isSuccess: successGetCategories,
    isRefetching,
    refetch,
  } = useQueryWithDependencies(
    "GET_SHOP_CATEGORIES_LIST",
    GetShopCategoriesList,
    categoriesParams,
    categoriesParams,
  );
  // console.log(categoriesParams)
  // console.log(shopCategoriesList)

  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={shopCategoriesData}
            statisticsData={StatisticsOfShopCategory}
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

export default ShopCategoriesWrapper;
