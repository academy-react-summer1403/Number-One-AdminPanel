// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Col, Row, TabContent, TabPane } from "reactstrap";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";


// import CourseCard from "./CourseCard";
import { useSelector } from "react-redux";
// import {
//   handlePageNumber,
//   handleQueryCourse,
//   handleRowsOfPage,
// } from "../../../../redux/slices/CourseList";
// import CourseReserve from "../allCourseRes/CourseReserve";
// import PaymentOfCourses from "../payment-courses/PaymentOfCourses";
import { GetCourses } from "../../../@core/services/api/get-api";
import GeneralStatistics from "../../../@core/components/generalStatistics";
import { coursesSortOption, StatisticsOfCourses } from "../../../@core/constants/courses";
import Tabs from "./Tabs";
import ProductsHeader from "../../../@core/components/items-list/ProductsHeader";
import { handleQueryCourse, handleRowsOfPage } from "../store/CourseList";
import ListSearchbar from "../../../@core/components/products-list/ListSearchbar";
import CourseCard from "./CourseCard";


const Courses = () => {
  const [activeView, setActiveView] = useState("grid");
  const [activeTab, setActiveTab] = useState("1");
  const CoursesParams = useSelector((state) => state.CoursesList);
  // getting Data for api with use Query
  const { data: coursesData, isSuccess } = useQueryWithDependencies(
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

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  //   // ** States
  //   const [courses, setCourses] = useState([]);
  //   const [searched, setSearched] = useState("");
  //   const [currentPg, setCurrentPg] = useState("1");
  //   const [totalPg, setTotalPg] = useState(10);
  //   const [reFechGetCrs, setReFechGetCrs] = useState(1);
  //   const [staticc, setStaticc] = useState([]);

  //   // console.log("searched", deletee);

  //   const MySwal = withReactContent(Swal);

  //   // **API
  //   const Statictic = async () => {
  //     try {
  //       const response = await getStatictic();
  //       // console.log("response", response.courseDtos.length);
  //       setStaticc(response.courseDtos)
  //     } catch (error) {
  //       throw new Error("ERROR: ", error);
  //     }
  //   };

  //   const allCourses = async (search, page, sort) => {
  //     try {
  //       const getCoursesListt = await getCoursesList(searched, page);
  //       setCourses(getCoursesListt.courseDtos);
  //       setTotalPg(getCoursesListt.totalCount);
  //     } catch (error) {
  //       throw new Error("ERROR: ", error);
  //     }
  //   };

  //   const handleDeleteCourses = (A, I) => {
  //     // console.log("object", A , I);
  //     return MySwal.fire({
  //       title: "آیا مطمعن هستید؟",
  //       text: "البته امکان بازگشت نیز وجود دارد ",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: " بله ",
  //       cancelButtonText: " لغو ",

  //       customClass: {
  //         confirmButton: "btn btn-primary",
  //         cancelButton: "btn btn-outline-danger ms-1",
  //       },
  //       buttonsStyling: false,
  //     }).then(function (result) {
  //       if (result.value) {
  //         const deleteCourses = async () => {
  //           const data = {
  //             active: A,
  //             id: I,
  //           };
  //           const res = await delCourse(data);
  //           res.success
  //             ? MySwal.fire({
  //                 icon: "success",
  //                 title: "موفقیت ",
  //                 text: "عملیات با موفقیت انجام گردید",
  //                 confirmButtonText: " باشه ",

  //                 customClass: {
  //                   confirmButton: "btn btn-success",
  //                 },
  //               }) && setReFechGetCrs(reFechGetCrs + 1)
  //             : MySwal.fire({
  //                 icon: "error",
  //                 title: "شکست ",
  //                 text: "عملیات با شکست مواجهه گردید",
  //                 confirmButtonText: " باشه ",

  //                 customClass: {
  //                   confirmButton: "btn btn-success",
  //                 },
  //               });
  //         };
  //         deleteCourses();
  //       } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //         MySwal.fire({
  //           title: "لغو",
  //           text: "عملیات لغو شد :)",
  //           icon: "error",
  //           confirmButtonText: " باشه ",

  //           customClass: {
  //             confirmButton: "btn btn-success",
  //           },
  //         });
  //       }
  //     });
  //   };

  //   const handleActiveOrDee = (A, I) => {
  //     return MySwal.fire({
  //       title: "آیا مطمعن هستید؟",
  //       text: "البته امکان بازگشت نیز وجود دارد ",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: " بله ",
  //       cancelButtonText: " لغو ",

  //       customClass: {
  //         confirmButton: "btn btn-primary",
  //         cancelButton: "btn btn-outline-danger ms-1",
  //       },
  //       buttonsStyling: false,
  //     }).then(function (result) {
  //       if (result.value) {
  //         const activeOrDee = async () => {
  //           const courseA = {
  //             active: A,
  //             id: I,
  //           };
  //           const responses = await ActiveOrDeactive(courseA);
  //           responses.success
  //             ? MySwal.fire({
  //                 icon: "success",
  //                 title: "موفقیت ",
  //                 text: "عملیات با موفقیت انجام گردید",
  //                 confirmButtonText: " باشه ",

  //                 customClass: {
  //                   confirmButton: "btn btn-success",
  //                 },
  //               }) && setReFechGetCrs(reFechGetCrs + 1)
  //             : MySwal.fire({
  //                 icon: "error",
  //                 title: "شکست ",
  //                 text: "عملیات با شکست مواجهه گردید",
  //                 confirmButtonText: " باشه ",

  //                 customClass: {
  //                   confirmButton: "btn btn-success",
  //                 },
  //               });
  //         };
  //         activeOrDee();
  //       } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //         MySwal.fire({
  //           title: "لغو",
  //           text: "عملیات لغو شد :)",
  //           icon: "error",
  //           confirmButtonText: " باشه ",

  //           customClass: {
  //             confirmButton: "btn btn-success",
  //           },
  //         });
  //       }
  //     });
  //   };

  //   // **useEffect
  //   useEffect(() => {
  //     allCourses(searched, currentPg);
  //   }, [searched, currentPg, reFechGetCrs]);

  // useEffect(() => {
  //   Statictic()
  // }, []);

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
                  />
                  {/* <PaginationBar
                    data={coursesData}
                    params={CoursesParams}
                    isSuccess={isSuccess}
                    variant={"course"}
                    handlePage={handlePageNumber}
                  /> */}
                </TabPane>
                {/* <TabPane tabId="2">
                  <CourseReserve />
                </TabPane>
                <TabPane tabId="3">
                  <PaymentOfCourses courseId={DataWithoutDependencies?.courseDtos[0]?.courseId}/>
                </TabPane> */}
              </TabContent>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Courses;
