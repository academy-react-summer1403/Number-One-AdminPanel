import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import GetAdminScheduals from "../../../@core/services/api/get-api/GetAdminScheduals";
import { handleData, handleRowsOfPage, handleFilterDate } from "../store";
import { HeaderTable } from "../../../@core/components/table-list";
import { Card, Col, Row, Table } from "reactstrap";
import headerTable from "../../../@core/constants/schedual/HeaderTable";
import CustomPagination from "../../../@core/components/pagination";
import TableItems from "./TableItems";
import ModalSchedule from "../create/ModalSchedule";
import SchedualCalendar from "./Calendar";
import SessionModal from "../session";

const AdminSchedualWrapper = () => {
  const params = useSelector((state) => state.SchedualSlice);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [scheduleDetails, setScheduleDetails] = useState(undefined);
  const [variantState, setVariantState] = useState(undefined);

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

  // Getting the desired item data
  const handleStatusDetail = () => {
    const detail = scheduals.find((item) => item.id == id);
    setScheduleDetails(detail);
  };

  useEffect(() => {
    if (isSuccess) {
      handleStatusDetail();
    }
  }, [id]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + params.RowsOfPage;
  const handleMovePage = (page) => {
    const newOffset = (page.selected * params.RowsOfPage) % scheduals?.length;
    setItemOffset(newOffset);
  };

  // create and edit Modal
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => setShowModal(!showModal);

  // Session Modal
  const [sessionModal, setSessionModal] = useState(false);
  const toggleSessionModal = () => setSessionModal(!sessionModal);

  // Handle RowOfPage for list
  const handleRows = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(handleRowsOfPage(value));
  };

  // Empty data after closing the modal every time
  useEffect(() => {
    if (!showModal) {
      setScheduleDetails(undefined);
      setId("");
    }
  }, [showModal]);

  return (
    <div className="app-user-list">
      <Card className="overflow-hidden">
        <Row className="px-2">
          <Col sm="8">
            <div className="react-dataTable overflow-hidden">
              <HeaderTable
                toggleSidebar={toggleShowModal}
                setScheduleDetails={setScheduleDetails}
                rowOfPage={params.RowsOfPage}
                handleRowOfPage={handleRows}
                buttonText={"افزودن بازه زمانی"}
                isFilter
                // toggleFilter={toggleFilterModal}
                setVariantState={setVariantState}
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
                  {params.FilteredData.length > 0 &&
                    params.FilteredData.slice(itemOffset, endOffset)?.map(
                      (item, index) => (
                        <TableItems
                          key={index}
                          refetch={refetch}
                          item={item}
                          toggleSession={toggleSessionModal}
                          setVariantState={setVariantState}
                          toggleModal={toggleShowModal}
                          setId={setId}
                        />
                      )
                    )}
                </tbody>
              </Table>
              {params.FilteredData.length == 0 && (
                <div className="w-100 my-5 text-center">موردی یافت نشد</div>
              )}
            </div>
            <CustomPagination
              total={scheduals?.length}
              current={params.PageNumber}
              rowsPerPage={params.RowsOfPage}
              handleClickFunc={handleMovePage}
            />
          </Col>
          <Col sm="4" className="my-2">
            <SchedualCalendar handleFilterDate={handleFilterDate} />
          </Col>
          {scheduleDetails && (
            <ModalSchedule
              showModal={showModal}
              toggle={toggleShowModal}
              data={scheduleDetails}
              refetch={refetch}
              variantState={variantState}
            />
          )}
        </Row>
      </Card>
      <SessionModal isOpen={sessionModal} toggle={toggleSessionModal} id={id} />
    </div>
  );
};

export default AdminSchedualWrapper;
