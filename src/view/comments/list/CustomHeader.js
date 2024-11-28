import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input } from "reactstrap";
import { setQueryComment, setRowsOfPage } from "../store/CommentsList";
import { useRef } from "react";

//** Table Header
const CustomHeader = () => {
  const commentFilterObj = useSelector((state) => state.CommentList);
  const Dispatch = useDispatch();

  const dispatch = useDispatch();
  const ref = useRef();

  const handleSetSearch = (e) => {
    clearTimeout(ref.current);
    const timeOut = setTimeout(() => {
      dispatch(setQueryComment(e));
    }, 1000);
    ref.current = timeOut;
  };
  
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    Dispatch(setRowsOfPage(value));
  };

  return (
    <div
      style={{ width: "95%", marginRight: "35px" }}
      className="invoice-list-table-header me-1 mt-2 mb-75"
    >
      <Row>
        <Col sm="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100 mb-1 mb-sm-0">
            <label htmlFor="rows-per-page">تعداد نمایش :</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={commentFilterObj.RowsOfPage}
              onChange={handlePerPage}
              style={{ width: "6rem" }}
            >
              <option value="6">6</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col
          sm="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 "
        >
          <div className="d-flex w-50 align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              جستجو:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              // value={searchTerm}
              onChange={(e) => handleSetSearch(e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomHeader;
