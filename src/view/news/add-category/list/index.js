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
import { GetNewsCategory } from "../../../../@core/services/api/get-api";
import {
  categoryNewsTableTitles,
  StatisticsOfNewsCategories,
} from "../../../../@core/constants/news-manage/Options";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import ImageFallBack from "../../../../@core/components/image-fallback";
import fallback from "../../../../assets/images/cards/coursee.jfif";
import { Edit, FileText, MoreVertical } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../../../@core/components/pagination";
import {
  handleAllList,
  handleQuery,
  handleRowsOfPage,
} from "../store/BlogCategoryList";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import ListHeader from "../../../../@core/components/products-list/ListHeader";

const BlogCategoriesWrapper = () => {
  const dispatch = useDispatch();
  const { PageNumber, RowsOfPage, FilteredList, AllList, Query } = useSelector(
    (state) => state.BlogCategoryList
  );

  // console.log(FilteredList);
  // getting data from Api with use Query
  const { data: newsCategory, isSuccess: successGetNewsCat } =
    useQueryWithoutDependencies("GET_NEWS_CATEGORY", GetNewsCategory);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const [page, setPage] = useState({ selected: 0 });
  const handleWithOutDispatch = (page) => {
    setPage(page);
    const newOffset = (page.selected * RowsOfPage) % FilteredList.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (successGetNewsCat) {
      dispatch(handleAllList(newsCategory));
    }
  }, [successGetNewsCat]);

  useEffect(() => {
    if (Query) handleWithOutDispatch(page);
  }, [Query]);

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
        <Col md={9} xs={12}>
          <div>
            <Row >
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
                <HeaderTable titles={categoryNewsTableTitles} />
                <tbody style={{ overflowX: "auto" }}>
                  {FilteredList &&
                    FilteredList.slice(itemOffset, endOffset)?.map(
                      (item, index) => {
                        return (
                          <tr key={index} className="">
                            <td>
                              <ImageFallBack
                                alt="img"
                                src={item.image}
                                fallback={fallback}
                                className={""}
                                style={{ height: "40px" }}
                              />
                            </td>
                            <td>{item.categoryName}</td>
                            <td
                              className=""
                              style={{
                                maxWidth: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.googleTitle}
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
                                    key={index}
                                    onClick={() => alert("جزئیات")}
                                  >
                                    <span className="align-middle">جزئیات</span>
                                    <FileText className="me-50" size={15} />
                                  </DropdownItem>
                                  <DropdownItem
                                    key={index}
                                    onClick={() => alert("ویرایش")}
                                  >
                                    <span className="align-middle">ویرایش</span>
                                    <Edit className="me-50" size={15} />
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </Table>
            </div>
            {/* <AcceptPaymentModal
            showModal={showModal}
            setShowModal={setShowModal}
            paymentId={paymentId}
            paymentReceipt={paymentReceipt}
            refetch={getAllPayments}
          /> */}
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

export default BlogCategoriesWrapper;
