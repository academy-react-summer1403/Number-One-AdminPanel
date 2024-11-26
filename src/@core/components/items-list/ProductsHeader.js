// ** Third Party Components
import classnames from "classnames";
import { Grid, List } from "react-feather";
import { useDispatch } from "react-redux";
import Select from "react-select";

// ** Reactstrap Imports
import { Row, Col, Button, ButtonGroup } from "reactstrap";

const ProductsHeader = ({
  // activeView,
  // setActiveView,
  rowsFunc,
  sortOptions,
}) => {
  const dispatch = useDispatch();

  // ** User Current options
  const ShowCurrentOption = [
    { label: "15", value: 15 },
    { label: "24", value: 24 },
    { label: "48", value: 48 },
  ];

  return (
    <div className="align-items-center">
      <Row>
        <Col sm="4" className="d-flex align-items-center">
          <div className="d-flex align-items-center w-100 gap-75">
            <label htmlFor="rows-per-page">نمایش</label>
            <Select
              className="react-select rounded-3"
              classNamePrefix="select"
              defaultValue={ShowCurrentOption[0]}
              name="rowsFunc"
              options={ShowCurrentOption}
              onChange={(option) => dispatch(rowsFunc(option.value))}
            />
          </div>
        </Col>
        <Col
          sm="8"
          className="d-flex align-items-center justify-content-end gap-75"
        >
          <div className="d-flex align-items-center gap-75">
            <label style={{ minWidth: "70px" }}>مرتب سازی:</label>
            {sortOptions?.map((item, index) => (
              <Select
                key={index}
                className="react-select rounded-3"
                classNamePrefix="select"
                defaultValue={item.Options[0]}
                name="clear"
                options={item.Options}
                onChange={(option) => dispatch(item.setState(option.value))}
              />
            ))}
          </div>
          {/* <ButtonGroup>
            <Button
              tag="label"
              className={classnames(
                "btn-icon view-btn grid-view-btn py-0 d-flex align-items-center",
                {
                  active: activeView === "grid",
                }
              )}
              color="primary"
              outline
              onClick={() => setActiveView("grid")}
              style={{ height: "38px" }}
            >
              <Grid size={18} />
            </Button>
            <Button
              tag="label"
              className={classnames(
                "btn-icon view-btn list-view-btn py-0 d-flex align-items-center",
                {
                  active: activeView === "list",
                }
              )}
              color="primary"
              outline
              onClick={() => setActiveView("list")}
              style={{ height: "38px" }}
            >
              <List size={18} />
            </Button>
          </ButtonGroup> */}
        </Col>
      </Row>
    </div>
  );
};

export default ProductsHeader;
