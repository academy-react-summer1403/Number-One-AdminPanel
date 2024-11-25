
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Tooltip,
} from "reactstrap";

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// // ** Invoice List Sidebar
// import Sidebar from './Sidebar'

// // ** Third Party Components
// import Select from 'react-select'

// // ** Utils
// import { selectThemeColors } from '@utils'

// // ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryWithDependencies } from "../../../../utility/hooks/useCustomQuery";
import CustomPagination from "../../../../@core/components/pagination";
import { GetCoursePayment, GetUserList } from "../../../../@core/services/api/get-api";

const Payments = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: paymentData } = useQueryWithDependencies(
    "GET_COURSE_PAYMENT",
    GetCoursePayment,
    id,
    id
  );
  const AllPayment = [
    ...(paymentData?.donePays || []),
    ...(paymentData?.notDonePays || []),
  ];

  console.log(AllPayment);
  // Get All Users
  const { data: users } = useQueryWithDependencies(
    "GET_USER_LIST",
    GetUserList,
    null,
    { PageNumber: 1, RowsOfPage: 1000 }
  );
  // console.log(users)

  const handlePaymentUpdate = (userName) => {
    // const userId = users?.listUser.find(item => item.)
  };

  // Pagination
  const [PageNumber, setPageNumber] = useState(1);
  const [RowsOfPage, setRowsOfPage] = useState(8);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * RowsOfPage) % paymentData?.length;
    setItemOffset(newOffset);
  };
  return (
    <Fragment>
      <Card className="">
        <div className="react-dataTable">
          <Table hover>
            <thead>
              <tr className="text-center">
                <th className=" px-0"> نام کاربر</th>
                <th className=" px-0">گروه دوره </th>
                <th className=" px-0"> وضعیت پرداختی</th>
              </tr>
            </thead>
            {AllPayment &&
              AllPayment.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr className="text-center">
                      <td className=" px-0">{item?.studentName}</td>
                      <td className=" px-0">{item?.groupName}</td>
                      <td className=" px-0">
                        <Badge
                          pill
                          color={
                            item?.peymentDone ? "light-primary" : "light-danger"
                          }
                          className="me-1"
                        >
                          {item?.peymentDone ? " تایید شده" : "تایید نشده"}
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </div>
      </Card>
      {AllPayment?.length == 0 ? (
        <div className="mx-auto my-8" style={{ textAlign: "center" }}>
          هنوز پرداختی برای این گروه انجام نشد
        </div>
      ) : null}
      <CustomPagination
        total={paymentData?.length}
        current={PageNumber}
        rowsPerPage={RowsOfPage}
        handleClickFunc={handleWithOutDispatch}
      />
    </Fragment>
  );
};

export default Payments;
