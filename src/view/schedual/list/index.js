import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import GetAdminScheduals from "../../../@core/services/api/get-api/GetAdminScheduals";
import { handleData, handleQuery, handleRowsOfPage } from "../store";
import { HeaderTable } from "../../../@core/components/table-list";
import { Card, Col, Row, Table } from "reactstrap";
import headerTable from "../../../@core/constants/schedual/HeaderTable";
import CustomPagination from "../../../@core/components/pagination";
import TableItems from "./TableItems";
import FilterModal from "./FilterModal";

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

  // Filter Modal
  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);

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
                buttonText={"افزودن بازه زمانی"}
                isFilter
                toggleFilter={toggleFilterModal}
                isSearching={false}
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
                        refetch={refetch}
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
              total={scheduals?.length}
              current={params.PageNumber}
              rowsPerPage={params.RowsOfPage}
              handleClickFunc={handleMovePage}
            />
          </Card>
        </Col>
        <FilterModal
          refetch={refetch}
          isOpen={filterModal}
          toggle={toggleFilterModal}
        />
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
      </Row>
    </div>
  );
};

export default SchedualListWrapper;
