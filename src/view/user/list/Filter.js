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

  // User Params
  const userParams = useSelector((state) => state.FilterSlice);

  const filterSections = [
    {
      label: "انتخاب بر اساس نقش",
      value: userParams.roleId,
      options: roleOptions,
      action: handleRoleId,
    },
    {
      label: "انتخاب بر اساس وضعیت",
      value: userParams.IsActiveUser,
      options: isActiveOptions,
      action: handleIsActiveUser,
    },
    {
      label: "فعال/غیر فعال",
      value: userParams.SortType,
      options: statusOptions,
      action: handleSortType,
    },
    {
      label: "صعودی/نزولی",
      value: userParams.SortingCol,
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
                  value={item.value}
                  options={item.options}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  onChange={(data) => {
                    dispatch(item.action(data));
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