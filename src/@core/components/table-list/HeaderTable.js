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
    <Row className="w-100 mx-0 my-2">
      <Col xl="6" className="d-flex align-items-center">
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
        className="d-flex align-items-center justify-content-end gap-75"
      >
        {isSearching && (
          <Input
            style={{ width: "300px" }}
            id="searchBox"
            placeholder="جستجو ..."
            onChange={(e) => {
              e.preventDefault();
              dispatch(handleSearch(searchBox.value));
            }}
          />
        )}
        {isCreate && (
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
        )}
      </Col>
    </Row>
  );
};

export default HeaderTable;
