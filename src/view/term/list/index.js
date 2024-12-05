import { Card, Col, Row, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { handleRowsOfPage, handleData, handleQuery } from "../store";
import headerTable from "../../../@core/constants/term-manage/HeaderTable";
import {
  GetTermDetails,
  GetTermList,
} from "../../../@core/services/api/get-api";
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../utility/hooks/useCustomQuery";
import TableItems from "./TableItems";
import CustomPagination from "../../../@core/components/pagination";
import EditTerm from "./EditTerm";
import CreateTerm from "./CreateTerm";
import { Reports, HeaderTable } from "../../../@core/components/table-list";
import { TermReports } from "../../../@core/constants/term-manage/Reports";
import CloseDateModal from "./CloseDateModal";

const TermsWrapper = () => {
  const params = useSelector((state) => state.TermList);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const {
    data: terms,
    isSuccess: termSuccess,
    refetch,
    isRefetching,
  } = useQueryWithoutDependencies("GET_TERMS", GetTermList);

  useEffect(() => {
    if (termSuccess) {
      dispatch(handleData(terms));
    }
  }, [termSuccess, isRefetching]);

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

  // Close Date Modal
  const [addCloseDateModal, setAddCloseDateModal] = useState(false);
  const toggleAddCloseModal = () => setAddCloseDateModal(!addCloseDateModal);

  // Handle RowOfPage for list
  const handleRows = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(handleRowsOfPage(value));
  };

  const { data: termDetail, isSuccess: detailSuccess } =
    useQueryWithDependencies("GET_TERM_DETAILS", GetTermDetails, id, id);

  return (
    <div className="app-user-list">
      <Row>
        <Reports reports={TermReports(termSuccess && terms)} />
        <Col sm="12">
          <Card className="overflow-hidden">
            <div className="react-dataTable">
              <HeaderTable
                toggleSidebar={toggleCreateModal}
                rowOfPage={params.RowsOfPage}
                handleRowOfPage={handleRows}
                handleSearch={handleQuery}
                buttonText={"افزودن ترم"}
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
                        addCloseDateModal={toggleAddCloseModal}
                        setId={setId}
                      />
                    )
                  )}
                </tbody>
              </Table>
            </div>
            <CustomPagination
              total={terms?.length}
              current={params.PageNumber}
              rowsPerPage={params.RowsOfPage}
              handleClickFunc={handleMovePage}
            />
          </Card>
        </Col>
        <EditTerm
          data={detailSuccess && termDetail}
          refetch={refetch}
          isOpen={editModal}
          toggle={toggleEditModal}
        />
        <CreateTerm
          refetch={refetch}
          isOpen={createModal}
          toggle={toggleCreateModal}
        />
        <CloseDateModal
          data={{
            closeReason: "",
            endCloseDate: "",
            startCloseDate: "",
            termId: id,
          }}
          isOpen={addCloseDateModal}
          refetch={refetch}
          section={"create"}
          toggle={toggleAddCloseModal}
        />
      </Row>
    </div>
  );
};

export default TermsWrapper;
