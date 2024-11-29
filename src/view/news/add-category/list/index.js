import { Fragment } from "react";
import { Col, Row } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { GetNewsCategory } from "../../../../@core/services/api/get-api";
import { StatisticsOfNewsCategories } from "../../../../@core/constants/news-manage/Options";

const BlogCategoriesWrapper = () => {
  // getting data from Api with use Query
  const { data: newsCategory, isSuccess: successGetNewsCat } =
    useQueryWithoutDependencies("GET_NEWS_CATEGORY", GetNewsCategory);
  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={newsCategory}
            statisticsData={StatisticsOfNewsCategories}
            resize="12"
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default BlogCategoriesWrapper;
