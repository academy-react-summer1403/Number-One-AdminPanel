import { Fragment, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { GetCoursesStatus } from "../../../../@core/services/api/get-api";
import { StatisticsOfCourseStatus } from "../../../../@core/constants/courses/StatisticsOfCourses";
import ListHeader from "../../../../@core/components/products-list/ListHeader";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import {
  handleAllList,
  handleQuery,
  handleRowsOfPage,
} from "../store/StatusList";
import { useDispatch, useSelector } from "react-redux";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import { StatusTableTitles } from "../../../../@core/constants/courses/DetailsTabs";
import { Edit } from "react-feather";
import Img from "../../../../assets/images/cards/status.png";
import AddStatusModal from "../create";
import CustomPagination from "../../../../@core/components/pagination";

const CourseStatusWrapper = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [variantState, setVariantState] = useState(undefined);
  const [categoryDetails, setCategoryDetails] = useState(undefined);
  // redux Params
  const { PageNumber, RowsOfPage, FilteredList, AllList, Query } = useSelector(
    (state) => state.StatusList
  );
  // getting data from Api with use Query
  const {
    data: CourseStatusData,
    isSuccess: successGetStatus,
    isRefetching,
    refetch,
  } = useQueryWithoutDependencies("GET_COURSE_STATUS", GetCoursesStatus);

  // Getting the desired item data
  const handleCategoryDetail = (Id) => {
    const detail = CourseStatusData.find((item) => item.id == Id);
    setCategoryDetails(detail);
    setShowModal((old) => !old);
  };

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
    if (successGetStatus) {
      dispatch(handleAllList(CourseStatusData));
    }
  }, [successGetStatus, isRefetching]);

  useEffect(() => {
    if (Query) handleWithOutDispatch(page);
  }, [Query]);

  // Empty data after closing the modal every time
  useEffect(() => {
    if (!showModal) setCategoryDetails(undefined);
  }, [showModal]);

  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={CourseStatusData}
            statisticsData={StatisticsOfCourseStatus}
            resize="12"
          />
          <div className="d-flex justify-content-end">
            <Button
              className=" p-0 py-1 text-center"
              style={{ width: "100%" }}
              color="primary"
              onClick={() => {
                setVariantState("create");
                setCategoryDetails("test");
                setShowModal((old) => !old);
              }}
            >
              <span className="mx-auto">افزودن وضعیت دوره</span>
            </Button>
          </div>
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
                <HeaderTable titles={StatusTableTitles} />
                <tbody style={{ overflowX: "auto" }}>
                  {FilteredList?.length != 0 ? (
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
                          <td>{item.statusName}</td>
                          <td
                            style={{
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.describe}
                          </td>
                          <td
                            className="text-center"
                            onClick={() => {
                              setVariantState("update");
                              handleCategoryDetail(item.id);
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
                      وضعیتی وجود ندارد
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

export default CourseStatusWrapper;
