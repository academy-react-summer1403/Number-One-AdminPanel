import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Table } from "reactstrap";
import CustomPagination from "../../../@core/components/pagination";
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../utility/hooks/useCustomQuery";
import {
  GetClassRomeDetail,
  GetClassRomeList,
} from "../../../@core/services/api/get-api";
import { handleData, handleQuery, handleRowsOfPage } from "../store";
import headerTable from "../../../@core/constants/class-manage/HeaderTable";
import TableItems from "./TableItems";
import EditClass from "./EditClass";
import { HeaderTable } from "../../../@core/components/table-list";
import CreateClass from "./CreateClass";

const ClassRomeWrapper = () => {
  const params = useSelector((state) => state.ClassList);
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  const {
    data: classes,
    isSuccess,
    refetch,
    isRefetching,
  } = useQueryWithDependencies("GET_CLASSES", GetClassRomeList);

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleData(classes));
    }
  }, [isSuccess, isRefetching]);

  const { data: classDetail, isSuccess: detailSuccess } =
    useQueryWithDependencies("GET_CLASS_DETAILS", GetClassRomeDetail, id, id);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + params.RowsOfPage;
  const handleMovePage = (page) => {
    const newOffset = (page.selected * params.RowsOfPage) % classes?.length;
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
                buttonText={"افزودن کلاس"}
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
              total={classes?.length}
              current={params.PageNumber}
              rowsPerPage={params.RowsOfPage}
              handleClickFunc={handleMovePage}
            />
          </Card>
        </Col>
        <EditClass
          data={detailSuccess && classDetail}
          refetch={refetch}
          isOpen={editModal}
          toggle={toggleEditModal}
        />
        <CreateClass
          refetch={refetch}
          isOpen={createModal}
          toggle={toggleCreateModal}
        />
      </Row>
    </div>
  );
};

export default ClassRomeWrapper;
