import { Fragment, useEffect, useState } from "react";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
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
import { Edit, FileText, MoreVertical } from "react-feather";
import CustomPagination from "../../../../@core/components/pagination";

const CourseTechnologiesWrapper = () => {
  const dispatch = useDispatch();
  // redux Params
  const { PageNumber, RowsOfPage, FilteredList, AllList, Query } = useSelector(
    (state) => state.TechnologiesList
  );
  // getting data from Api with use Query
  const {
    data: CourseTechData,
    isSuccess: successGetTach,
    refetch,
  } = useQueryWithoutDependencies(
    "GET_COURSE_TECHNOLOGIES",
    GetCourseTechnologies
  );

  useEffect(() => {
    if (successGetTach) {
      dispatch(handleAllList(CourseTechData));
    }
  }, [successGetTach]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const [page, setPage] = useState({ selected: 0 });
  const handleWithOutDispatch = (page) => {
    setPage(page);
    const newOffset = (page.selected * RowsOfPage) % FilteredList.length;
    setItemOffset(newOffset);
  };

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
                              <UncontrolledDropdown direction="start">
                                <DropdownToggle
                                  className="icon-btn hide-arrow"
                                  color="transparent"
                                  size="sm"
                                  caret
                                >
                                  <MoreVertical size={15} />
                                </DropdownToggle>
                                <DropdownMenu className="d-flex flex-column p-0">
                                  <DropdownItem
                                    // key={index}
                                    onClick={() => {
                                      // setShowDetailsModal((old) => !old);
                                      // setCategoryId(item.id)
                                    }}
                                  >
                                    <span className="align-middle">جزئیات</span>
                                    <FileText className="ms-50" size={15} />
                                  </DropdownItem>
                                  <DropdownItem
                                    // key={index}
                                    onClick={() => {
                                      // setVariantState("update");
                                      // handleCategoryDetail(item.id);
                                    }}
                                  >
                                    <span className="align-middle">ویرایش</span>
                                    <Edit className="ms-50" size={15} />
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
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
