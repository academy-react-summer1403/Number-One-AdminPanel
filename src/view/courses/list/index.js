// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Col, Row, TabContent, TabPane } from "reactstrap";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { useDispatch, useSelector } from "react-redux";
// import CourseReserve from "../allCourseRes/CourseReserve";
// import PaymentOfCourses from "../payment-courses/PaymentOfCourses";
import { GetCourses } from "../../../@core/services/api/get-api";
import GeneralStatistics from "../../../@core/components/generalStatistics";
import {
  coursesSortOption,
  StatisticsOfCourses,
} from "../../../@core/constants/courses";
import Tabs from "./Tabs";
import ProductsHeader from "../../../@core/components/items-list/ProductsHeader";
import {
  handlePageNumber,
  handleQueryCourse,
  handleRowsOfPage,
} from "../store/CourseList";
import ListSearchbar from "../../../@core/components/products-list/ListSearchbar";
import CourseCard from "./CourseCard";
import CustomPagination from "../../../@core/components/pagination";
import CourseReserve from "./tabs/CourseReserve";
import PaymentOfCourses from "./tabs/PaymentOfCourses";
import { ActiveOrDeActive } from "../../../@core/services/api/put-api";

const Courses = () => {
  const [activeView, setActiveView] = useState("grid");
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();
  const CoursesParams = useSelector((state) => state.CoursesList);
  // getting Data for api with use Query
  const { data: coursesData, isSuccess, refetch } = useQueryWithDependencies(
    "GET_COURSES_DATA",
    GetCourses,
    CoursesParams,
    CoursesParams
  );
  const { data: DataWithoutDependencies } = useQueryWithDependencies(
    "GET_COURSES_DATA",
    GetCourses,
    null,
    null
  );
  // console.log(DataWithoutDependencies)
  const handlePagination = (page) => {
    dispatch(handlePageNumber(page.selected + 1));
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const activeOrDeActive = async (boolean, id) => {
    try {
      const data = {
        active: boolean,
        id: id,
      };
      const responses = await ActiveOrDeActive(data, refetch);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={DataWithoutDependencies}
            statisticsData={StatisticsOfCourses}
            resize="12"
          />
        </Col>
        <Col md={9} xs={12}>
          <div className="content-detached content-right">
            <div className="content-body" style={{ marginRight: "0" }}>
              <Tabs
                className="mb-2"
                activeTab={activeTab}
                toggleTab={toggleTab}
              />
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <ProductsHeader
                    // activeView={activeView}
                    // setActiveView={setActiveView}
                    rowsFunc={handleRowsOfPage}
                    sortOptions={coursesSortOption}
                  />
                  <ListSearchbar QueryFunction={handleQueryCourse} />
                  <CourseCard
                    activeView={activeView}
                    item={coursesData?.courseDtos}
                    handleActiveOrDetective={activeOrDeActive}
                  />
                  <CustomPagination
                    total={coursesData?.totalCount}
                    current={CoursesParams.PageNumber}
                    rowsPerPage={CoursesParams.RowsOfPage}
                    handleClickFunc={handlePagination}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <CourseReserve />
                </TabPane>
                <TabPane tabId="3">
                  <PaymentOfCourses
                    courseId={DataWithoutDependencies?.courseDtos[0]?.courseId}
                  />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Courses;
