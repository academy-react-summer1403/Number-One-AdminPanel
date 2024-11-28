// React Imports
import { Fragment, useEffect, useState } from "react";

// Reactstrap
import { Col, Row } from "reactstrap";

// Custom Component
import {
  ProductsSortOption,
  StatisticsOfProducts,
} from "../../../@core/constants/products-manage/Options";
import {
  ProductCards,
  ListHeader,
  ListSearchbar,
  Sidebar,
} from "../../../@core/components/products-list";
import CustomPagination from "../../../@core/components/pagination";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handlePageNumber,
  handleQuery,
  handleRowsOfPage,
} from "../store/ProductsList";

// Query
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../utility/hooks/useCustomQuery";

// Api
import {
  GetAllProducts,
  GetProductsWithParams,
  GetShopList,
} from "../../../@core/services/api/get-api";
import { UpdateProducts } from "../../../@core/services/api/put-api";

// ** Styles
import "@styles/react/apps/app-ecommerce.scss";
import ChangeMoment from "../../../utility/moment";
import { useGetItem } from "../../../utility/hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";

const ProductsPage = () => {
  const params = useSelector((state) => state.ProductsList);
  const dispatch = useDispatch();
  const userId = useGetItem("id");
  const [accessibleProducts, setAccessibleProducts] = useState([]);

  // Getting Product Data From Api With Use Params
  const {
    data: dataWithParams,
    isSuccess,
    refetch,
  } = useQueryWithDependencies(
    "GET_PRODUCTS_WITH_PARAMS",
    GetProductsWithParams,
    params,
    params
  );
  
  // Getting Product Data From Api With Out Params
  const { data } = useQueryWithoutDependencies(
    "GET_ALL_PRODUCTS",
    GetAllProducts
  );
  
  console.log(data)
  // Getting Shop Data From Api
  const { data: shop } = useQueryWithoutDependencies("GET_SHOPS", GetShopList);

  // Getting stores that have admin access
  const GetAccessibleProducts = () => {
    let productList = [];
    for (const product of dataWithParams) {
      const chooseShop = shop?.find((item) => item.id === product.shopId);
      if (chooseShop) {
        let accessIds = chooseShop.permissionIds.find((id) => id == userId);
        if (accessIds) {
          productList.push(product);
        }
      }
    }
    setAccessibleProducts(productList);
  };

  useEffect(() => {
    if (isSuccess) {
      GetAccessibleProducts();
    }
  }, [isSuccess, shop, dataWithParams]);

  // Pagination
  const handleMovePage = (page) => {
    dispatch(handlePageNumber(page.selected + 1));
  };

  // Handle Active Or Deactivate
  const { mutate: activeOrDeactive } = useMutation({
    mutationKey: ["ACTIVE_OR_DEACTIVE"],
    mutationFn: (data) => {
      UpdateProducts(data.Id, { isActive: data.IsActive }, refetch);
    },
  });

  const handleActiveOrDeactive = (boolean, id) => {
    try {
      const dataObj = { Id: id, IsActive: boolean };
      activeOrDeactive(dataObj);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <Sidebar
            data={data}
            statisticsData={StatisticsOfProducts}
            resize="12"
          />
        </Col>
        <Col md={9} xs={12}>
          <div className="content-detached content-right">
            <div className="content-body" style={{ marginRight: "0" }}>
              <ListHeader
                rowsFunc={handleRowsOfPage}
                sortOptions={ProductsSortOption}
              />
              <ListSearchbar QueryFunction={handleQuery} />
              {accessibleProducts?.length > 0 ? (
                <div className="grid-view">
                  {accessibleProducts?.map((item, index) => (
                    <ProductCards
                      key={index}
                      id={item.id}
                      image={item.pictureList?.[0]?.href}
                      title={item.title}
                      miniDescribe={item.miniDiscribe}
                      insertDate={ChangeMoment(
                        item.insertDate,
                        "YYYY/MM/DD",
                        "persian"
                      )}
                      price={item.price}
                      href={"/product/view/"}
                      currentRate={null}
                      handleActiveOrDetective={handleActiveOrDeactive}
                      status={item.isActive}
                    />
                  ))}
                </div>
              ) : (
                <h6
                  className="section-label fs-6"
                  style={{
                    textAlign: "center",
                    marginTop: "200px",
                    marginBottom: "200px",
                  }}
                >
                  محصولی وجود ندارد
                </h6>
              )}
              <CustomPagination
                total={data?.length}
                current={params.PageNumber}
                rowsPerPage={params.RowsOfPage}
                handleClickFunc={handleMovePage}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductsPage;
