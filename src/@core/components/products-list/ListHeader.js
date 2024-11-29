// ** Third Party Components
import { useDispatch } from "react-redux";
import Select from "react-select";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

const ListHeader = ({ rowsFunc, sortOptions,styleDisplay,colWidth }) => {
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
        <Col sm={colWidth ? colWidth : "4"} className="d-flex align-items-center">
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
          className={`d-flex align-items-center justify-content-end gap-75 ${styleDisplay}`}
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
        </Col>
      </Row>
    </div>
  );
};

export default ListHeader;
