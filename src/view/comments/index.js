import { Col, Row } from "reactstrap";
import GeneralStatistics from "../../@core/components/generalStatistics";
import { StatisticsOfComments } from "../../@core/constants/comments";
import { useQueryWithDependencies } from "../../utility/hooks/useCustomQuery";
import GetAllComments from "../../@core/services/api/get-api/GetAllComments";
import Filters from "./Filter";
import CommentsList from "./list/CommentsList";
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner.js";

const CommentsPage = () => {
  const { data: commentData, isLoading } = useQueryWithDependencies(
    "GET_COMMENT_DATA",
    GetAllComments,
    null,
    { PageNumber: 1, RowsOfPage: 10000 }
  );

  if (isLoading) {
    return <ComponentSpinner />;
  }

  return (
    <div className="app-user-list">
      <Row>
        <Col sm="12">
          <GeneralStatistics
            data={commentData}
            statisticsData={StatisticsOfComments}
            resize="4"
          />
        </Col>
        <Col sm="12">
          <Filters />
        </Col>
        <Col sm="12">
          <CommentsList />
        </Col>
      </Row>
    </div>
  );
};

export default CommentsPage;
