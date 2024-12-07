import { Button, Card, Col, Row, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { handleRowsOfPage, handleData, handleQuery } from "../store";
import headerTable from "../../../@core/constants/term-manage/HeaderTable";
import {
  GetTermDetails,
  GetTermList
} from "../../../@core/services/api/get-api";
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies
} from "../../../utility/hooks/useCustomQuery";
import TableItems from "./TableItems";
import CustomPagination from "../../../@core/components/pagination";
import EditTerm from "./EditTerm";
import CreateTerm from "./CreateTerm";
import { Reports, HeaderTable } from "../../../@core/components/table-list";
import { TermReports } from "../../../@core/constants/term-manage/Reports";
import CloseDateModal from "./CloseDateModal";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner.js";

const TermsWrapper = () => {
  const params = useSelector((state) => state.TermList);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const {
    data: terms,
    isSuccess: termSuccess,
    refetch,
    isRefetching,
    isLoading
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
    const newOffset = (page.selected * params.RowsOfPage) % terms?.length;
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

  // Close Date Modal
  const [updateCloseDateModal, setUpdateCloseDateModal] = useState(false);
  const toggleUpdateCloseModal = () =>
    setUpdateCloseDateModal(!updateCloseDateModal);

  // Handle RowOfPage for list
  const handleRows = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(handleRowsOfPage(value));
  };

  const { data: termDetail, isSuccess: detailSuccess } =
    useQueryWithDependencies("GET_TERM_DETAILS", GetTermDetails, id, id);

  if (isLoading) {
    return <ComponentSpinner />;
  }

  return (
    <div className="app-user-list">
      <Row>
        <Reports reports={TermReports(termSuccess && terms)} />
        <Col sm="12">
          <Card className="overflow-hidden">
            <div className="react-dataTable">
              <div className="d-flex align-items-center">
                <HeaderTable
                  toggleSidebar={toggleCreateModal}
                  rowOfPage={params.RowsOfPage}
                  handleRowOfPage={handleRows}
                  handleSearch={handleQuery}
                  buttonText={"افزودن ترم"}
                />
                <Button
                  className="add-new-user me-1"
                  style={{ height: "39px", width: "120px" }}
                  color="primary"
                  onClick={toggleAddCloseModal}
                >
                  افزودن زمان
                </Button>
              </div>
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
                        updateCloseDateModal={toggleUpdateCloseModal}
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
            termId: ""
          }}
          isOpen={addCloseDateModal}
          refetch={refetch}
          section={"create"}
          toggle={toggleAddCloseModal}
        />
        <CloseDateModal
          data={detailSuccess && termDetail}
          isOpen={updateCloseDateModal}
          refetch={refetch}
          section={"update"}
          toggle={toggleUpdateCloseModal}
        />
      </Row>
    </div>
  );
};

export default TermsWrapper;
