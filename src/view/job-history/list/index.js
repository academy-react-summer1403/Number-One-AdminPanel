import { Card, Col, Row, Table } from "reactstrap";
import headerTable from "../../../@core/constants/job/HeaderTable";
import { HeaderTable } from "../../../@core/components/table-list";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { handleData, handleQuery, handleRowsOfPage } from "../store";
import { GetJobHistory } from "../../../@core/services/api/get-api";
import { useQueryWithoutDependencies } from "../../../utility/hooks/useCustomQuery";
import CustomPagination from "../../../@core/components/pagination";
import TableItems from "./TableItems";
import EditModal from "./EditModal";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner.js";

const JobHistoryWrapper = () => {
  const params = useSelector((state) => state.JobHistorySlice);
  const dispatch = useDispatch();
  const [id, setId] = useState();

  const {
    data: jobs,
    isSuccess,
    isRefetching,
    refetch,
    isLoading
  } = useQueryWithoutDependencies("GET_JOB_HISTORY", GetJobHistory);

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleData(jobs));
    }
  }, [isSuccess, isRefetching]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + params.RowsOfPage;
  const handleMovePage = (page) => {
    const newOffset = (page.selected * params.RowsOfPage) % jobs?.length;
    setItemOffset(newOffset);
  };

  // Handle RowOfPage for list
  const handleRows = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(handleRowsOfPage(value));
  };

  // Edit Modal
  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);

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
                rowOfPage={params.RowsOfPage}
                handleRowOfPage={handleRows}
                handleSearch={handleQuery}
                isCreate={false}
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
                        refetch={refetch}
                        setId={setId}
                        toggleModal={toggleEditModal}
                      />
                    )
                  )}
                </tbody>
              </Table>
            </div>
            <CustomPagination
              total={jobs?.length}
              current={params.PageNumber}
              rowsPerPage={params.RowsOfPage}
              handleClickFunc={handleMovePage}
            />
          </Card>
        </Col>
        {/* <EditModal 
          data={} 
        /> */}
      </Row>
    </div>
  );
};

export default JobHistoryWrapper;
