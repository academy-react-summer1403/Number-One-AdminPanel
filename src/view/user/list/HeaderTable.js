import { Form, InputGroup } from "reactstrap";
import { Row, Col, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";

// Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useRef } from "react";

const HeaderTable = ({
  toggleSidebar,
  handleRowOfPage,
  rowOfPage,
  handleSearch,
}) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const handleSetSearch = (e) => {
    clearTimeout(ref.current);
    const timeOut = setTimeout(() => {
      dispatch(handleSearch(e));
    }, 1000);
    ref.current = timeOut;
  };

  return (
    <div
      style={{ width: "95%", marginRight: "35px" }}
      className="invoice-list-table-header me-1 mt-2 mb-75"
    >
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowOfPage}
              onChange={handleRowOfPage}
              style={{ width: "5rem" }}
            >
              <option value="6">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <Input
              style={{ width: "300px" }}
              id="searchBox"
              placeholder="جستجو ..."
              onChange={(e) => {
                e.preventDefault();
                handleSetSearch(searchBox.value);
              }}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              افزودن کاربر جدید
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderTable;
