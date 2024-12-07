import { Card, Col, Row, Table } from "reactstrap";
import headerTable from "../../../@core/constants/department-manage/HeaderTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleData, handleQuery, handleRowsOfPage } from "../store";
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies
} from "../../../utility/hooks/useCustomQuery";
import {
  GetDepartmentDetails,
  GetDepartmentList
} from "../../../@core/services/api/get-api";
import TableItems from "./TableItems";
import { HeaderTable } from "../../../@core/components/table-list";
import CustomPagination from "../../../@core/components/pagination";
import EditDepartment from "./EditDepartment";
import CreateDepartment from "./CreateDepartment";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner.js";

const DepartmentWrapper = () => {
  const params = useSelector((state) => state.DepartmentList);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const { data: depDetail, isSuccess: detailSuccess } =
    useQueryWithDependencies(
      "GET_DEPARTMENT_DETAILS",
      GetDepartmentDetails,
      id,
      id
    );

  const {
    data: departments,
    isSuccess: departmentSuccess,
    refetch,
    isRefetching,
    isLoading
  } = useQueryWithoutDependencies("GET_DEPARTMENTS", GetDepartmentList);

  useEffect(() => {
    if (departmentSuccess) {
      dispatch(handleData(departments));
    }
  }, [departmentSuccess, isRefetching]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + params.RowsOfPage;
  const handleMovePage = (page) => {
    const newOffset = (page.selected * params.RowsOfPage) % departments?.length;
    setItemOffset(newOffset);
  };

  // Edit Modal
  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);

  // Create Modal
  const [createModal, setCreateModal] = useState(false);
  const toggleCreateModal = () => setCreateModal(!createModal);

  // Handle RowOfPage for list
  const handleRows = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(handleRowsOfPage(value));
  };

  if (isLoading) {
    return <ComponentSpinner />;
  }

  return (
    <div className="app-user-list">
      <Row>
        <Col sm="12">
          <Card className="overflow-hidden">
            <div className="react-dataTable">
              <HeaderTable
                toggleSidebar={toggleCreateModal}
                rowOfPage={params.RowsOfPage}
                handleRowOfPage={handleRows}
                handleSearch={handleQuery}
                buttonText={"افزودن بخش"}
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
                  {params.FilteredData?.slice(itemOffset, endOffset)?.map(
                    (item, index) => (
                      <TableItems
                        key={index}
                        item={item}
                        toggleModal={toggleEditModal}
                        setId={setId}
                      />
                    )
                  )}
                </tbody>
              </Table>
            </div>
            <CustomPagination
              total={departments?.length}
              current={params.PageNumber}
              rowsPerPage={params.RowsOfPage}
              handleClickFunc={handleMovePage}
            />
          </Card>
        </Col>
        <EditDepartment
          data={detailSuccess && depDetail}
          refetch={refetch}
          isOpen={editModal}
          toggle={toggleEditModal}
        />
        <CreateDepartment
          refetch={refetch}
          isOpen={createModal}
          toggle={toggleCreateModal}
        />
      </Row>
    </div>
  );
};

export default DepartmentWrapper;
