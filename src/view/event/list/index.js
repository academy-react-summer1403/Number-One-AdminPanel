// React Imports
import { Fragment } from "react";
import fallback from "../../../assets/images/portrait/small/events.png";

// Api
import {
  GetAllEvents,
  GetEventsList
} from "../../../@core/services/api/get-api";

// Query
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies
} from "../../../utility/hooks/useCustomQuery";

// Reactstrap
import { Col, Row } from "reactstrap";

// Customize Component
import {
  Sidebar,
  ListHeader,
  ListSearchbar,
  ProductCards
} from "../../../@core/components/products-list";
import CustomPagination from "../../../@core/components/pagination";
import {
  StatisticsOfEvents,
  eventsSortOption
} from "../../../@core/constants/event-manage/Options";
import ChangeMoment from "../../../utility/moment";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handlePageNumber,
  handleQuery,
  handleRowsOfPage
} from "../store/EventsList";

// ** Styles
import "@styles/react/apps/app-ecommerce.scss";
import { useMutation } from "@tanstack/react-query";
import { UpdateEvent } from "../../../@core/services/api/put-api";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner.js";

const EventsPage = () => {
  const dispatch = useDispatch();

  const params = useSelector((state) => state.EventsList);

  // Get Event List From Mock Api
  const {
    data: dataWithParams,
    isSuccess,
    refetch,
    isLoading
  } = useQueryWithDependencies(
    "GET_EVENTS_LIST",
    GetEventsList,
    params,
    params
  );

  // Get All Events With Out Params
  const { data } = useQueryWithoutDependencies("GET_EVENTS", GetAllEvents);

  // Pagination
  const handleMovePage = (page) => {
    dispatch(handlePageNumber(page.selected + 1));
  };

  const { mutate } = useMutation({
    mutationKey: ["ACTIVE_AND_DETECTIVE"],
    mutationFn: (data) => {
      UpdateEvent(data.Id, { isActive: data.IsActive }, refetch);
    }
  });

  const handleActiveDeactive = (boolean, id) => {
    try {
      const dataObj = { Id: id, IsActive: boolean };
      mutate(dataObj);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <ComponentSpinner />;
  }

  return (
    <Fragment>
      <Row>
        <Col xs={3}>
          <Sidebar
            data={data}
            statisticsData={StatisticsOfEvents}
            resize="12"
          />
        </Col>
        <Col xs={9}>
          <div className="content-detached content-right">
            <div className="content-body" style={{ marginRight: "0" }}>
              <ListHeader
                rowsFunc={handleRowsOfPage}
                sortOptions={eventsSortOption}
              />
              <ListSearchbar QueryFunction={handleQuery} />
              {dataWithParams?.length > 0 ? (
                <div className="grid-view">
                  {dataWithParams?.map((item, index) => (
                    <ProductCards
                      key={index}
                      id={item.id}
                      image={item.currentImageAddressTumb}
                      title={item.title}
                      miniDescribe={item.miniDescribe}
                      insertDate={ChangeMoment(
                        item.insertDate,
                        "YYYY/MM/DD",
                        "persian"
                      )}
                      price={item.price}
                      href={"/events/view/"}
                      currentRate={null}
                      handleActiveOrDetective={handleActiveDeactive}
                      status={item.isActive}
                      fallback={fallback}
                    />
                  ))}
                </div>
              ) : (
                <h6
                  className="section-label fs-6"
                  style={{
                    textAlign: "center",
                    marginTop: "200px",
                    marginBottom: "200px"
                  }}
                >
                  ایونتی وجود ندارد
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

export default EventsPage;
