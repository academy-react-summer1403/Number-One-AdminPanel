import { Fragment } from "react";
import { Col, Row } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { GetCoursesStatus } from "../../../../@core/services/api/get-api";
import { StatisticsOfCourseStatus } from "../../../../@core/constants/courses/StatisticsOfCourses";

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
      </Row>
    </Fragment>
  );
};

export default CourseStatusWrapper;
