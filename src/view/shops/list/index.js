import { Fragment, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
// import Sidebar from "../paper/Sidebar";

import { useDispatch, useSelector } from "react-redux";
import GetShopList from "../../../@core/services/api/get-api/GetShopList";
import { useGetItem } from "../../../utility/hooks/useLocalStorage";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import GeneralStatistics from "../../../@core/components/generalStatistics";
import { handleAllList, handleQuery, handleRowsOfPage } from "../store/ShopList";
import StatisticsOfShop from "../../../@core/constants/shops/StatisticsOfShop";
import ShopCard from "./ShopCard";
import CustomPagination from "../../../@core/components/pagination";
import ListHeader from "../../../@core/components/products-list/ListHeader";
import { ShopSortOption } from "../../../@core/constants/shops";
import ListSearchbar from "../../../@core/components/products-list/ListSearchbar";

const ShopPage = () => {
  const { PageNumber, RowsOfPage, FilteredList, AllList } = useSelector(
    (state) => state.ShopList
  );
  const dispatch = useDispatch();
  const userId = useGetItem("id");
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
        const accessIds = shop.permissionIds?.find((id) => id == userId);
        if (accessIds) shopsArray.push(shop);
      }
    }
    // console.log(shopsArray)
    dispatch(handleAllList(shopsArray));
  };

  useEffect(() => {
    GetAccessibleShops();
  }, [isSuccess]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * RowsOfPage) % FilteredList.length;
    setItemOffset(newOffset);
  };

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
        <Col md={9} xs={12}>
          <div className="content-detached content-right">
            <div className="content-body" style={{ marginRight: "0" }}>
              <ListHeader
                rowsFunc={handleRowsOfPage}
                sortOptions={ShopSortOption}
              />
              <ListSearchbar QueryFunction={handleQuery} />
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
                        href={"/shops/view/"}
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
        </Col>
      </Row>
    </Fragment>
  );
};

export default ShopPage;
