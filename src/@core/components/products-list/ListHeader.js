// ** Third Party Components
import { useDispatch } from "react-redux";
import Select from "react-select";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

const ListHeader = ({ isActiveFunc, rowsFunc, sortingColFunc }) => {
  const dispatch = useDispatch();

  // ** User filter options
  const isActiveOptions = [
    { value: true, label: "فعال" },
    { value: false, label: "غیرفعال" },
  ];

  const SortingColOptions = [
    { value: "InsertDate", label: "جدیدترین" },
    { value: "currentView", label: "پربازدیدترین" },
    { value: "currentLikeCount", label: "محبوب ترین" },
  ];

  const ShowCurrentOption = [
    { label: "12", value: 12 },
    { label: "18", value: 18 },
    { label: "24", value: 24 },
  ];

  return (
    <div className="align-items-center">
      <Row>
        <Col xs="4" className="d-flex align-items-center">
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
          xs="8"
          className="d-flex align-items-center justify-content-end gap-75"
        >
          <div className="d-flex align-items-center gap-75">
            <label style={{ minWidth: "70px" }}>مرتب سازی:</label>
            <Select
              className="react-select rounded-3"
              classNamePrefix="select"
              defaultValue={SortingColOptions[0]}
              name="sortingCol"
              options={SortingColOptions}
              onChange={(option) => dispatch(sortingColFunc(option.value))}
            />
            <Select
              className="react-select rounded-3"
              classNamePrefix="select"
              defaultValue={isActiveOptions[0]}
              name="isActive"
              options={isActiveOptions}
              onChange={(option) => dispatch(isActiveFunc(option.value))}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ListHeader;
