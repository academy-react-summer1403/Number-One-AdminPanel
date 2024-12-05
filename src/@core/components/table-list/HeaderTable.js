import { Row, Col, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";

// Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const HeaderTable = ({
  toggleSidebar,
  setScheduleDetails,
  handleRowOfPage,
  rowOfPage,
  buttonText,
  setVariantState,
  isCreate = true,
  isSearching = true,
  handleSearch,
}) => {
  const dispatch = useDispatch();

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
              <option value="6">6</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          {isCreate && (
            <div className="d-flex align-items-center gap-75 table-header-actions">
              <Button
                className="add-new-user"
                color="primary"
                onClick={() => {
                  toggleSidebar();
                  setScheduleDetails("test");
                  setVariantState("create");
                }}
              >
                {buttonText}
              </Button>
            </div>
          )}
          {isSearching && (
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <Input
                style={{ width: "300px" }}
                id="searchBox"
                placeholder="جستجو ..."
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(handleSearch(searchBox.value));
                }}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HeaderTable;
