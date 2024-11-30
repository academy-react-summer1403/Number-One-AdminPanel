import { Fragment } from "react";
import { Col, Row } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { GetCourseLevels } from "../../../../@core/services/api/get-api";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { StatisticsOfCourseLevel } from "../../../../@core/constants/courses/StatisticsOfCourses";

const CourseLevelWrapper = () => {
  // getting data from Api with use Query
  const {
    data: CourseLevelsData,
    isSuccess: successGetLevels,
    isRefetching,
    refetch,
  } = useQueryWithoutDependencies("GET_COURSE_LEVEL", GetCourseLevels);
  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={CourseLevelsData}
            statisticsData={StatisticsOfCourseLevel}
            resize="12"
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default CourseLevelWrapper;
