import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../utility/hooks/useCustomQuery";
import {
  GetAssistanceWork,
  GetAssistanceWorkDetail,
} from "../../../@core/services/api/get-api";
import { handleData, handleQuery, handleRowsOfPage } from "../store";
import { Card, Col, Row, Table } from "reactstrap";
import { HeaderTable } from "../../../@core/components/table-list";
import headerTable from "../../../@core/constants/assistance-work/HeaderTable";
import CustomPagination from "../../../@core/components/pagination";
import TableItems from "./TableItems";
import ModalTask from "./ModalTask";

const AssistanceWorkWrapper = () => {
  const params = useSelector((state) => state.AssistanceWorkList);
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  const {
    data: assWork,
    isSuccess: assSuccess,
    isRefetching,
    refetch,
  } = useQueryWithoutDependencies(
    "GET_ASSISTANCE_WORK_LIST",
    GetAssistanceWork
  );

  useEffect(() => {
    if (assSuccess) {
      dispatch(handleData(assWork));
    }
  }, [assSuccess, isRefetching]);

  const { data: assDetail, isSuccess: detailSuccess } =
    useQueryWithDependencies(
      "GET_ASSISTANCE_WORK_DETAILS",
      GetAssistanceWorkDetail,
      id,
      id
    );

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + params.RowsOfPage;
  const handleMovePage = (page) => {
    const newOffset = (page.selected * params.RowsOfPage) % assWork?.length;
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
                buttonText={"افزودن تسک"}
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
              total={assWork?.length}
              current={params.PageNumber}
              rowsPerPage={params.RowsOfPage}
              handleClickFunc={handleMovePage}
            />
          </Card>
        </Col>
        <ModalTask
          data={detailSuccess && assDetail}
          refetch={refetch}
          isOpen={editModal}
          toggle={toggleEditModal}
          section={"update"}
        />
        <ModalTask
          data={{
            worktitle: "",
            workDescribe: "",
            assistanceId: "",
            workDate: "",
          }}
          refetch={refetch}
          isOpen={createModal}
          toggle={toggleCreateModal}
          section={"create"}
        />
      </Row>
    </div>
  );
};

export default AssistanceWorkWrapper;
