// ** React Imports
import { Fragment, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useDispatch } from "react-redux";
import { FilterCommentsArray } from "../../@core/constants/comments";

const Filters = () => {
  const dispatch = useDispatch();

  const handleChange = (data, setState) => {
    dispatch(setState(data != null ? data.value : null));
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {FilterCommentsArray.map((item, index) => (
              <Col md="4" key={index} className="mb-1">
                <Label for="status-select">{item.label}</Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder={"انتخاب کنید"}
                  name="clear"
                  // defaultValue={valueInput}
                  options={item.options}
                  onChange={(data) => handleChange(data, item.setState)}
                  isClearable
                />
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Filters;
