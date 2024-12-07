import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Table,
} from "reactstrap";
import GeneralStatistics from "../../../../@core/components/generalStatistics";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { StatisticsOfCourseTechnologies } from "../../../../@core/constants/courses/StatisticsOfCourses";
import { GetCourseTechnologies } from "../../../../@core/services/api/get-api";
import ListHeader from "../../../../@core/components/products-list/ListHeader";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import {
  handleAllList,
  handleQuery,
  handleRowsOfPage,
} from "../store/TechnologiesList";
import { useDispatch, useSelector } from "react-redux";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import { technologiesTableTitles } from "../../../../@core/constants/courses/DetailsTabs";
import fallback from "../../../../assets/images/cards/Modren-Tech.jpg";
import ImageFallBack from "../../../../@core/components/image-fallback";
import { Edit} from "react-feather";
import CustomPagination from "../../../../@core/components/pagination";
import AddTechnologyModal from "../create";
import ComponentSpinner from "../../../../@core/components/spinner/Loading-spinner.js";

const CourseTechnologiesWrapper = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [variantState, setVariantState] = useState(undefined);
  const [categoryDetails, setCategoryDetails] = useState(undefined);
  // redux Params
  const { PageNumber, RowsOfPage, FilteredList, AllList, Query } = useSelector(
    (state) => state.TechnologiesList
  );
  // getting data from Api with use Query
  const {
    data: CourseTechData,
    isSuccess: successGetTach,
    isRefetching,
    refetch,
    isLoading
  } = useQueryWithoutDependencies(
    "GET_COURSE_TECHNOLOGIES",
    GetCourseTechnologies
  );

  // Getting the desired item data
  const handleCategoryDetail = (Id) => {
    const detail = CourseTechData.find((item) => item.id == Id);
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
    if (successGetTach) {
      dispatch(handleAllList(CourseTechData));
    }
  }, [successGetTach, isRefetching]);

  useEffect(() => {
    if (Query) handleWithOutDispatch(page);
  }, [Query]);

  // Empty data after closing the modal every time
  useEffect(() => {
    if (!showModal) setCategoryDetails(undefined);
  }, [showModal]);

  if (isLoading) {
    return <ComponentSpinner />
  }

  return (
    <Fragment>
      <Row>
        <Col md={3} xs={12}>
          <GeneralStatistics
            data={CourseTechData}
            statisticsData={StatisticsOfCourseTechnologies}
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
              <span className="mx-auto">افزودن تکنولوژی</span>
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
                <HeaderTable titles={technologiesTableTitles} />
                <tbody style={{ overflowX: "auto" }}>
                  {FilteredList?.length != 0 ? (
                    FilteredList.slice(itemOffset, endOffset)?.map(
                      (item, index) => {
                        return (
                          <tr key={item.id} className="">
                            <td>
                              <ImageFallBack
                                alt="img"
                                src={item.iconAddress}
                                fallback={fallback}
                                className={""}
                                style={{ height: "30px" }}
                              />
                            </td>
                            <td>{item.techName}</td>
                            <td
                              className=""
                              style={{
                                maxWidth: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.describe}
                            </td>
                            <td className="text-center">
                              <td
                                onClick={() => {
                                  setVariantState("update");
                                  handleCategoryDetail(item.id);
                                }}
                              >
                                <span className="align-middle">ویرایش</span>
                                <Edit className="ms-50" size={15} />
                              </td>
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <h6
                      className="section-label fs-6"
                      style={{
                        textAlign: "center",
                        marginTop: "200px",
                        marginBottom: "200px",
                      }}
                    >
                      تکنولوژی وجود ندارد
                    </h6>
                  )}
                </tbody>
              </Table>
            </div>
            {categoryDetails && (
              <AddTechnologyModal
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

export default CourseTechnologiesWrapper;
