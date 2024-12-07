import {  Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner.js";

// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// Custom Component
import CustomPagination from "../../../@core/components/pagination";
import HeaderTable from "./HeaderTable";
import CreateNewUser from "../create";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";

// Api
import { GetUserList } from "../../../@core/services/api/get-api";

// Redux
import {
  handlePageNumber,
  handleQuery,
  handleRowsOfPage,
} from "../store/FilterSlice.js";
import { handleAllUser } from "../store/UserInfoSlice.js";

// Filter
import Filter from "./Filter";
import TableItems from "./TableItems";

// Style
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// Constants
import { headerTable } from "../../../@core/constants/user";

const UsersList = () => {
  const dispatch = useDispatch();

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // User Params For Filter
  const userParams = useSelector((state) => state.FilterSlice);

  // Get All Users
  const {
    data: users,
    isSuccess,
    refetch,
    isLoading
  } = useQueryWithDependencies(
    "GET_USER_LIST",
    GetUserList,
    userParams,
    userParams
  );

  if (isSuccess) {
    dispatch(handleAllUser(users));
  }
  const userList = useSelector((state) => state.UserInfoSlice.allUsers.listUser);
  const totalCount = useSelector((state) => state.UserInfoSlice.allUsers.totalCount);
  console.log(totalCount)

  // Handle RowOfPage for list
  const handleRows = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(handleRowsOfPage(value));
  };

  const handleWithDispatch = (page) => {
    dispatch(handlePageNumber(page.selected + 1));
  };

  if (isLoading) {
    return <ComponentSpinner />
  }

  return (
    <Fragment>
      <Filter />
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <HeaderTable
            toggleSidebar={toggleSidebar}
            rowOfPage={userParams.RowsOfPage}
            handleRowOfPage={handleRows}
            handleSearch={handleQuery}
          />
          <Table hover>
            <thead className="text-center">
              <tr>
                {headerTable.map((item, index) => (
                  <th key={index} className="px-0">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userList &&
                userList.map((item, index) => (
                  <TableItems key={index} item={item} />
                ))}
            </tbody>
          </Table>
        </div>
        <CustomPagination
          total={totalCount}
          current={userParams.PageNumber}
          rowsPerPage={userParams.RowsOfPage}
          handleClickFunc={handleWithDispatch}
        />
      </Card>
      <CreateNewUser
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setSidebarOpen={setSidebarOpen}
      />
    </Fragment>
  );
};

export default UsersList;
