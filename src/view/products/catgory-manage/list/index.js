import { Fragment, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../../utility/hooks/useCustomQuery";
import {
  GetProductCategories,
  GetProductCategoryList,
} from "../../../../@core/services/api/get-api";
import {
  productCategoriesTableTitles,
  StatisticsOfProductCategory,
} from "../../../../@core/constants/products-manage/Options";
import ListHeader from "../../../../@core/components/products-list/ListHeader";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import { handleQuery, handleRowsOfPage } from "../store/ProductCategoryList";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import { useSelector } from "react-redux";
import { Edit } from "react-feather";
import CustomPagination from "../../../../@core/components/pagination";
import Img from "../../../../assets/images/cards/Product.jpg";
import AddProductCategoryModal from "../create";


const ProductCategoryWrapper = () => {
    const [showModal, setShowModal] = useState(false);
    const [variantState, setVariantState] = useState(undefined);
    const [categoryDetails, setCategoryDetails] = useState(undefined);
  // redux Params
  const categoriesParams = useSelector((state) => state.ProductCategoryList);
  const { PageNumber, RowsOfPage, Query } = useSelector(
    (state) => state.ProductCategoryList
  );
  // getting data from Api with use Query
  const {
    data: productCategoriesData,
    // isSuccess: successGetCategories,
  } = useQueryWithoutDependencies(
    "GET_PRODUCT_CATEGORIES",
    GetProductCategoryList
  );

  // getting data from Api with use Query with dependency
  const { data: productCategoriesList, refetch } = useQueryWithDependencies(
    "GET_SHOP_CATEGORIES_LIST",
    GetProductCategories,
    categoriesParams,
    categoriesParams
  );

  // Getting the desired item data
  const handleStatusDetail = (Id) => {
    const detail = productCategoriesList.find((item) => item.id == Id);
    setCategoryDetails(detail);
    setShowModal((old) => !old);
  };

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const [page, setPage] = useState({ selected: 0 });
  const handleWithOutDispatch = (page) => {
    setPage(page);
    const newOffset = (page.selected * RowsOfPage) % productCategoriesList.length;
    setItemOffset(newOffset);
  };

   // Empty data after closing the modal every time
   useEffect(() => {
    if (!showModal) setCategoryDetails(undefined);
  }, [showModal]);

  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={productCategoriesData}
            statisticsData={StatisticsOfProductCategory}
            resize="12"
          />
           <div className="d-flex justify-content-end">
            <Button
              className=" p-0 py-1 text-center"
              style={{ width: "100%" }}
              color="primary"
              onClick={() => {
                setVariantState("create");
                setCategoryDetails("test");
                setShowModal((old) => !old);
              }}
            >
              <span className="mx-auto">افزودن دسته بندی</span>
            </Button>
          </div>
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
            <div style={{ overflowX: "auto" }}>
              <Table hover style={{ overflowX: "auto" }}>
                <HeaderTable titles={productCategoriesTableTitles} />
                <tbody style={{ overflowX: "auto" }}>
                  {productCategoriesList && productCategoriesList?.length > 0 ? (
                    productCategoriesList
                      .slice(itemOffset, endOffset)
                      ?.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>
                              <img
                                alt="img"
                                src={Img}
                                style={{ height: "30px" }}
                                className="rounded-1"
                              />
                            </td>
                            <td>{item.categoryName}</td>
                            <td
                              style={{
                                maxWidth: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.describe && item.describe}
                            </td>
                            <td
                              className="text-center"
                              onClick={() => {
                                setVariantState("update");
                                handleStatusDetail(item.id);
                              }}
                            >
                              <span className="align-middle">ویرایش</span>
                              <Edit className="ms-50" size={15} />
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <h6
                      className="section-label fs-6"
                      style={{
                        textAlign: "center",
                        marginTop: "200px",
                        marginBottom: "200px",
                      }}
                    >
                      دسته بندی وجود ندارد
                    </h6>
                  )}
                </tbody>
              </Table>
            </div>
            {categoryDetails && (
              <AddProductCategoryModal
                showModal={showModal}
                setShowModal={setShowModal}
                refetch={refetch}
                variantState={variantState}
                categoryDetails={categoryDetails}
              />
            )}
            <CustomPagination
              total={productCategoriesList?.length}
              current={PageNumber}
              rowsPerPage={RowsOfPage}
              handleClickFunc={handleWithOutDispatch}
            />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductCategoryWrapper;
