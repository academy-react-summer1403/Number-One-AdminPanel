import { Fragment } from "react";
import { Col, Row } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { GetCourseLevels } from "../../../../@core/services/api/get-api";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { StatisticsOfCourseLevel } from "../../../../@core/constants/courses/StatisticsOfCourses";
import ListHeader from "../../../../@core/components/products-list/ListHeader";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import { useSelector } from "react-redux";
import { handleQuery, handleRowsOfPage } from "../store/levelsList";

const CourseLevelWrapper = () => {
    // redux Params
  const { PageNumber, RowsOfPage, FilteredList, AllList, Query } = useSelector(
    (state) => state.LevelsList
  );
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

export default CourseLevelWrapper;
