import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
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
import AddBlogCategoryWrapper from "../create/CreateNewsModal";
import CategoryNewsDetails from "../view";
import ComponentSpinner from "../../../../@core/components/spinner/Loading-spinner.js";

const BlogCategoriesWrapper = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [variantState, setVariantState] = useState(undefined);
  const [categoryDetails, setCategoryDetails] = useState(undefined);
  const [categoryId, setCategoryId] = useState(undefined);

  const { PageNumber, RowsOfPage, FilteredList, AllList, Query } = useSelector(
    (state) => state.BlogCategoryList
  );

  // getting data from Api with use Query
  const {
    data: newsCategory,
    isSuccess: successGetNewsCat,
    refetch,
    isLoading
  } = useQueryWithoutDependencies("GET_NEWS_CATEGORY", GetNewsCategory);

  // const { mutate: categoryDetails } = useQueryWithDependencies(
  //   "GET_CATEGORY_DETAILS",
  //   GetNewsCategoryWithId,
  //   categoryId,
  //   categoryId,
  //   categoryId !== undefined
  // );

  // Getting the desired item data
  const handleCategoryDetail = (Id) => {
    const detail = newsCategory.find((item) => item.id == Id);
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

  useEffect(() => {
    if (successGetNewsCat) {
      dispatch(handleAllList(newsCategory));
    }
  }, [successGetNewsCat]);

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
            data={newsCategory}
            statisticsData={StatisticsOfNewsCategories}
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
              <span className="mx-auto">افزودن دسته بندی</span>
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
                <HeaderTable titles={categoryNewsTableTitles} />
                <tbody style={{ overflowX: "auto" }}>
                  {FilteredList?.length != 0 ? (
                    FilteredList.slice(itemOffset, endOffset)?.map(
                      (item, index) => {
                        return (
                          <tr key={item.id} className="">
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
                                    // key={index}
                                    onClick={() => {
                                      setShowDetailsModal((old) => !old);
                                      setCategoryId(item.id)
                                    }}
                                  >
                                    <span className="align-middle">جزئیات</span>
                                    <FileText className="ms-50" size={15} />
                                  </DropdownItem>
                                  <DropdownItem
                                    // key={index}
                                    onClick={() => {
                                      setVariantState("update");
                                      handleCategoryDetail(item.id);
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
                      دسته بندی وجود ندارد
                    </h6>
                  )}
                </tbody>
              </Table>
            </div>
            {categoryDetails && (
              <AddBlogCategoryWrapper
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
            <CategoryNewsDetails
              showModal={showDetailsModal}
              setShowModal={setShowDetailsModal}
              id={categoryId}
            />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default BlogCategoriesWrapper;
