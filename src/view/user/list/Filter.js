import { Fragment } from "react";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import {
  Row,
  Col,
  Card,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// Redux
import {
  handleIsActiveUser,
  handleRoleId,
  handleSortingCol,
  handleSortType,
} from "../store/FilterSlice";

// Constants
import {
  AscDescOptions,
  statusOptions,
  isActiveOptions,
  roleOptions,
} from "../../../@core/constants/user";

import { useDispatch, useSelector } from "react-redux";

// Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const Filter = () => {
  const dispatch = useDispatch();

  const filterSections = [
    {
      label: "انتخاب بر اساس نقش",
      options: roleOptions,
      action: handleRoleId,
    },
    {
      label: "انتخاب بر اساس وضعیت",
      options: isActiveOptions,
      action: handleIsActiveUser,
    },
    {
      label: "فعال/غیر فعال",
      options: statusOptions,
      action: handleSortType,
    },
    {
      label: "صعودی/نزولی",
      options: AscDescOptions,
      action: handleSortingCol,
    },
  ];

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {filterSections.map((item, index) => (
              <Col key={index} md="3">
                <Label for="role-select">{item.label}</Label>
                <Select
                  isClearable={false}
                  options={item.options}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  onChange={(data) => {
                    dispatch(item.action(data.value));
                  }}
                  placeholder="انتخاب کنید..."
                />
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Filter;
