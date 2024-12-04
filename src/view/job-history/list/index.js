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

const JobHistoryWrapper = () => {
  const params = useSelector((state) => state.JobHistorySlice);
  const dispatch = useDispatch();

  const {
    data: jobs,
    isSuccess,
    isRefetching,
    refetch,
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
      </Row>
    </div>
  );
};

export default JobHistoryWrapper;