import { Fragment, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
// import Sidebar from "../paper/Sidebar";
import {
  GeneralStatistics,
  // ProductsHeader,
  // ProductsSearchbar,
} from "../../../common";
import { useDispatch, useSelector } from "react-redux";
import { StatisticsOfShop } from "../../../core/constans/shop";
import { useQueryWithDependencies } from "../../../utility/hooks/react-query";
import { GetShopList } from "../../../core/services/api/get-api";
import {
  handleAllList,
  // handleQuery,
  // handleRowsOfPage,
} from "../../../redux/slices/ShopList";
// import ShopCard from "./ShopCard";
// import { CustomPagination } from "../pagination";
import { getItem } from "../../../core/services/common/storage.services";

const ShopPage = () => {
  const { PageNumber, RowsOfPage, FilteredList, AllList } = useSelector(
    (state) => state.ShopList
  );
  const dispatch = useDispatch();
  const userInfo = getItem("userInfo");
  // console.log(userInfo);
  // Getting shop data from Api With use Query
  const { data: shopData, isSuccess } = useQueryWithDependencies(
    "GET_SHOP_LIST",
    GetShopList,
    null,
    null
  );

  // Getting stores that have admin access
  const GetAccessibleShops = () => {
    const shopsArray = [];
    if (shopData) {
      for (const shop of shopData) {
        const accessIds = shop.permissionIds?.find((id) => id == userInfo.id);
        if (accessIds) shopsArray.push(shop);
      }
    }
    // console.log(shopsArray)
    dispatch(handleAllList(shopsArray));
  };

  useEffect(() => {
    GetAccessibleShops();
  }, [isSuccess]);

  // // Pagination
  // const [itemOffset, setItemOffset] = useState(0);
  // const endOffset = itemOffset + RowsOfPage;
  // const handleWithOutDispatch = (page) => {
  //   const newOffset = (page.selected * RowsOfPage) % FilteredList.length;
  //   setItemOffset(newOffset);
  // };

  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={AllList}
            statisticsData={StatisticsOfShop}
            resize="12"
          />
        </Col>
        {/* <Col md={9} xs={12}>
          <div className="content-detached content-right">
            <div className="content-body" style={{ marginRight: "0" }}>
              <ProductsHeader
                rowsFunc={handleRowsOfPage}
                sortOptions={ShopSortOption}
              />
              <ProductsSearchbar QueryFunction={handleQuery} />
              {FilteredList?.length > 0 ? (
                <div className="grid-view">
                  {FilteredList?.slice(itemOffset, endOffset)?.map(
                    (item, index) => (
                      <ShopCard
                        key={index}
                        id={item.id}
                        image={item.img}
                        currentRate={item.rate}
                        title={item.name}
                        aboutUs={item.aboutUs}
                        category={item.category}
                        startTime={item.startTime}
                        endTime={item.endTime}
                        href={"/shop/view/"}
                      />
                    )
                  )}
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
                  فروشگاهی وجود ندارد
                </h6>
              )}
              <CustomPagination
                total={FilteredList?.length}
                current={PageNumber}
                rowsPerPage={RowsOfPage}
                handleClickFunc={handleWithOutDispatch}
              />
            </div>
          </div>
        </Col> */}
      </Row>
    </Fragment>
  );
};

export default ShopPage;
