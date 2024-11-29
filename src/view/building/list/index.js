import { Card, Table } from "reactstrap";
import headerTable from "../../../@core/constants/building/HeaderTable";
import CustomPagination from "../../../@core/components/pagination";
import {
  GetBuildingDetails,
  GetBuildingList,
} from "../../../@core/services/api/get-api";
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../utility/hooks/useCustomQuery";
import TableItems from "./TableItems";
import { useDispatch, useSelector } from "react-redux";
import {
  handleData,
  handlePageNumber,
  handleQuery,
  handleRowsOfPage,
} from "../store/BuildingList";
import { Fragment, useEffect, useState } from "react";
import EditBuilding from "./EditBuilding";
import CreateBuilding from "./CreateBuilding";
import HeaderTable from "../../../@core/components/table-list/HeaderTable";

const BuildingWrapper = () => {
  const params = useSelector((state) => state.BuildingList);
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  const { data: details, isSuccess: detailSuccess } = useQueryWithDependencies(
    "GET_BUILDING_DETAILS",
    GetBuildingDetails,
    id,
    id
  );

  const {
    data: buildings,
    isSuccess,
    refetch,
    isRefetching,
  } = useQueryWithoutDependencies("GET_ALL_BUILDING", GetBuildingList);

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleData(buildings));
    }
  }, [isSuccess, isRefetching]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + params.RowsOfPage;
  const handleMovePage = (page) => {
    const newOffset = (page.selected * params.RowsOfPage) % buildings?.length;
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
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <HeaderTable
            toggleSidebar={toggleCreateModal}
            rowOfPage={params.RowsOfPage}
            handleRowOfPage={handleRows}
            handleSearch={handleQuery}
            buttonText={"افزودن ساختمان"}
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
                    id={item.id}
                    refetch={refetch}
                    status={item.active}
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
          total={buildings?.length}
          current={params.PageNumber}
          rowsPerPage={params.RowsOfPage}
          handleClickFunc={handleMovePage}
        />
      </Card>
      <EditBuilding
        data={detailSuccess && details}
        refetch={refetch}
        isOpen={editModal}
        toggle={toggleEditModal}
      />
      <CreateBuilding
        refetch={refetch}
        isOpen={createModal}
        toggle={toggleCreateModal}
      />
    </Fragment>
  );
};

export default BuildingWrapper;
