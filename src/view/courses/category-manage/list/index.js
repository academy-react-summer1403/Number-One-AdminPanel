import { Fragment } from "react";
import { Col, Row } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { StatisticsOfCourseTechnologies } from "../../../../@core/constants/courses/StatisticsOfCourses";
import { GetCourseTechnologies } from "../../../../@core/services/api/get-api";

const CourseTechnologiesWrapper = () => {
  // getting data from Api with use Query
  const {
    data: CourseTechData,
    isSuccess: successGetTach,
    refetch,
  } = useQueryWithoutDependencies("GET_COURSE_TECHNOLOGIES", GetCourseTechnologies);
  console.log(CourseTechData)

  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={CourseTechData}
            statisticsData={StatisticsOfCourseTechnologies}
            resize="12"
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default CourseTechnologiesWrapper;
