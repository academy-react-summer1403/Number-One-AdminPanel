import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import GetAdminScheduals from "../../../@core/services/api/get-api/GetAdminScheduals";
import { handleData, handleRowsOfPage } from "../store";
import { HeaderTable } from "../../../@core/components/table-list";
import { Card, Col, Row, Table } from "reactstrap";
import headerTable from "../../../@core/constants/schedual/HeaderTable";
import CustomPagination from "../../../@core/components/pagination";
import TableItems from "./TableItems";
import SchedualCalendar from "./Calendar";
import SessionModal from "../session";

const SchedualListWrapper = () => {
  const params = useSelector((state) => state.SchedualSlice);
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  const {
    data: scheduals,
    isSuccess,
    refetch,
    isRefetching,
  } = useQueryWithDependencies("GET_SCHEDUAL_LIST", GetAdminScheduals, params, {
    startDate: params?.startDate,
    endDate: params?.endDate,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleData(scheduals));
    }
  }, [isSuccess, isRefetching]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + params.RowsOfPage;
  const handleMovePage = (page) => {
    const newOffset = (page.selected * params.RowsOfPage) % scheduals?.length;
    setItemOffset(newOffset);
  };

  // Edit Modal
  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);

  // Create Modal
  const [createModal, setCreateModal] = useState(false);
  const toggleCreateModal = () => setCreateModal(!createModal);

  // Session Modal
  const [sessionModal, setSessionModal] = useState(false);
  const toggleSessionModal = () => setSessionModal(!sessionModal);

  // Handle RowOfPage for list
  const handleRows = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(handleRowsOfPage(value));
  };

  return (
    <div className="app-user-list">
      <Card className="overflow-hidden">
        <HeaderTable
          toggleSidebar={toggleCreateModal}
          rowOfPage={params.RowsOfPage}
          handleRowOfPage={handleRows}
          buttonText={"افزودن بازه زمانی"}
          isSearching={false}
        />
        <Row className="px-2">
          <Col sm="8">
            <div className="react-dataTable">
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
                        refetch={refetch}
                        item={item}
                        toggleEdit={toggleEditModal}
                        toggleSession={toggleSessionModal}
                        setId={setId}
                      />
                    )
                  )}
                </tbody>
              </Table>
            </div>
            <div>
              <CustomPagination
                total={scheduals?.length}
                current={params.PageNumber}
                rowsPerPage={params.RowsOfPage}
                handleClickFunc={handleMovePage}
              />
            </div>
          </Col>
          <Col sm="4" style={{ marginBottom: "22px" }}>
            <SchedualCalendar />
          </Col>
        </Row>
      </Card>
      <SessionModal isOpen={sessionModal} toggle={toggleSessionModal} id={id} />
      {/* <EditBuilding
          data={detailSuccess && details}
          refetch={refetch}
          isOpen={editModal}
          toggle={toggleEditModal}
        />
        <CreateBuilding
          refetch={refetch}
          isOpen={createModal}
          toggle={toggleCreateModal}
        /> */}
    </div>
  );
};

export default SchedualListWrapper;
