import { Fragment, useState } from "react";
import { Col, Row } from "reactstrap";
import { Book, Eye, EyeOff } from "react-feather";
import fallback from "../../../assets/images/portrait/small/blogs.png"

// Custom Components
import CustomPagination from "../../../@core/components/pagination";
import {
  Sidebar,
  ListHeader,
  ListSearchbar,
  ProductCards,
} from "../../../@core/components/products-list";

// Api
import { GetNewsList } from "../../../@core/services/api/get-api";

// React Query
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../utility/hooks/useCustomQuery";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handleIsActive,
  handlePageNumber,
  handleQuery,
  handleRowsOfPage,
  handleSortingCol,
} from "../store/NewsList";

// Custom function
import ChangeMoment from "../../../utility/moment";

// Style
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  NewsSortOption,
  StatisticsOfNews,
} from "../../../@core/constants/news-manage/Options";
import { useMutation } from "@tanstack/react-query";
import { ActiveDeactiveNews } from "../../../@core/services/api/put-api";
import useFormData from "../../../utility/hooks/useFormData";

const NewsTable = () => {
  const [activeView, setActiveView] = useState("grid");
  const newsParams = useSelector((state) => state.NewsList);
  const dispatch = useDispatch();

  const { data, isSuccess, refetch } = useQueryWithDependencies(
    "GET_NEWS_LIST",
    GetNewsList,
    newsParams,
    newsParams
  );

  const { data: activeData, isSuccess: activeSuccess } =
    useQueryWithDependencies("GET_NEWS_ACTIVE", GetNewsList, null, {
      RowsOfPage: 1,
      IsActive: true,
    });

  const { data: unActiveData, isSuccess: unActiveSuccess } =
    useQueryWithDependencies("GET_NEWS_UNACTIVE", GetNewsList, null, {
      RowsOfPage: 1,
      IsActive: false,
    });

  const handlePagination = (page) => {
    dispatch(handlePageNumber(page.selected + 1));
  };

  // Handle Active Or Detective
  const { mutate } = useMutation({
    mutationKey: ["َACTIVE_DEACTIVE"],
    mutationFn: (data) => {
      ActiveDeactiveNews(data, refetch);
    },
  });

  const handleActiveOrDetective = (boolean, id) => {
    try {
      const dataObj = useFormData({ Active: boolean, Id: id });
      mutate(dataObj);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col xs={12} lg={3}>
          <Sidebar
            data={{
              active: activeData?.totalCount,
              unActive: unActiveData?.totalCount,
            }}
            statisticsData={StatisticsOfNews}
            resize="12"
          />
        </Col>
        <Col xs={12} lg={9}>
          <div className="content-detached content-right">
            <div className="content-body" style={{ marginRight: "0" }}>
              <ListHeader
                rowsFunc={handleRowsOfPage}
                sortOptions={NewsSortOption}
              />
              <ListSearchbar QueryFunction={handleQuery} />
              <div className="grid-view">
                {isSuccess &&
                  data.news?.map((item, index) => (
                    <ProductCards
                      key={index}
                      href={"/blogs/view/"}
                      id={item.id}
                      image={item.currentImageAddressTumb}
                      currentRate={item.currentRate}
                      title={item.title}
                      miniDescribe={item.miniDescribe}
                      insertDate={ChangeMoment(
                        item.insertDate,
                        "YYYY/MM/DD",
                        "persian"
                      )}
                      currentView={item.currentView}
                      handleActiveOrDetective={handleActiveOrDetective}
                      status={item.isActive}
                      fallback={fallback}
                    />
                  ))}
              </div>
              <CustomPagination
                total={data?.totalCount}
                current={newsParams.PageNumber}
                rowsPerPage={newsParams.RowsOfPage}
                handleClickFunc={handlePagination}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NewsTable;
