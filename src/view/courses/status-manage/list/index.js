import { Fragment } from "react";
import { Col, Row } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { GetCoursesStatus } from "../../../../@core/services/api/get-api";
import { StatisticsOfCourseStatus } from "../../../../@core/constants/courses/StatisticsOfCourses";
import ListHeader from "../../../../@core/components/products-list/ListHeader";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import { handleQuery, handleRowsOfPage } from "../store/StatusList";

const CourseStatusWrapper = () => {
  // getting data from Api with use Query
  const {
    data: CourseStatusData,
    isSuccess: successGetStatus,
    isRefetching,
    refetch,
  } = useQueryWithoutDependencies("GET_COURSE_STATUS", GetCoursesStatus);
  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={CourseStatusData}
            statisticsData={StatisticsOfCourseStatus}
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

export default CourseStatusWrapper;
