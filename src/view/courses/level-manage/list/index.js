import { Fragment, useEffect, useState } from "react";
import { Col, Row, Table } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { GetCourseLevels } from "../../../../@core/services/api/get-api";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { StatisticsOfCourseLevel } from "../../../../@core/constants/courses/StatisticsOfCourses";
import ListHeader from "../../../../@core/components/products-list/ListHeader";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAllList,
  handleQuery,
  handleRowsOfPage,
} from "../store/levelsList";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import { LevelsTableTitles } from "../../../../@core/constants/courses/DetailsTabs";
import CustomPagination from "../../../../@core/components/pagination";
import Img from "../../../../assets/images/cards/level.png";
import { Edit } from "react-feather";

const CourseLevelWrapper = () => {
  const dispatch = useDispatch();

  // redux Params
  const { PageNumber, RowsOfPage, FilteredList, Query } = useSelector(
    (state) => state.LevelsList
  );
  //   console.log(FilteredList)
  // getting data from Api with use Query
  const {
    data: CourseLevelsData,
    isSuccess: successGetLevels,
    isRefetching,
    refetch,
  } = useQueryWithoutDependencies("GET_COURSE_LEVEL", GetCourseLevels);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const [page, setPage] = useState({ selected: 0 });
  const handleWithOutDispatch = (page) => {
    setPage(page);
    const newOffset = (page.selected * RowsOfPage) % FilteredList.length;
    setItemOffset(newOffset);
  };

  // Use Effects
  useEffect(() => {
    if (successGetLevels) {
      dispatch(handleAllList(CourseLevelsData));
    }
  }, [successGetLevels, isRefetching]);

  useEffect(() => {
    if (Query) handleWithOutDispatch(page);
  }, [Query]);

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
            <div style={{ overflowX: "auto" }}>
              <Table hover style={{ overflowX: "auto" }}>
                <HeaderTable titles={LevelsTableTitles} />
                <tbody style={{ overflowX: "auto" }}>
                  {FilteredList && FilteredList?.length > 0 ? (
                    FilteredList.slice(itemOffset, endOffset)?.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <img
                              alt="img"
                              src={Img}
                              style={{ height: "30px" }}
                              className="rounded-1"
                            />
                          </td>
                          <td>{item.levelName}</td>
                          <td
                            style={{
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.levelName}
                          </td>
                          <td
                            className="text-center"
                            onClick={() => {
                              //   setVariantState("update");
                              //   handleCategoryDetail(item.id);
                            }}
                          >
                            <span className="align-middle">ویرایش</span>
                            <Edit className="ms-50" size={15} />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h6
                      className="section-label fs-6"
                      style={{
                        textAlign: "center",
                        marginTop: "200px",
                        marginBottom: "200px",
                      }}
                    >
                      سطح دوره ای وجود ندارد
                    </h6>
                  )}
                </tbody>
              </Table>
            </div>
            {categoryDetails && (
              <AddStatusModal
                showModal={showModal}
                setShowModal={setShowModal}
                refetch={refetch}
                variantState={variantState}
                categoryDetails={categoryDetails}
              />
            )}
            <CustomPagination
              total={FilteredList?.length}
              current={PageNumber}
              rowsPerPage={RowsOfPage}
              handleClickFunc={handleWithOutDispatch}
            />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CourseLevelWrapper;
