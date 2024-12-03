import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import GetAdminScheduals from "../../../@core/services/api/get-api/GetAdminScheduals";
import { handleData, handleFilterDate, handleRowsOfPage } from "../store";
import { HeaderTable } from "../../../@core/components/table-list";
import { Card, Col, Row, Table } from "reactstrap";
import headerTable from "../../../@core/constants/schedual/HeaderTable";
import CustomPagination from "../../../@core/components/pagination";
import TableItems from "./TableItems";
import FilterModal from "./FilterModal";
import { Calendar, getAllDatesInRange } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import "./calender.css";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

const SchedualListWrapper = () => {
  const params = useSelector((state) => state.SchedualSlice);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);

  const handleRangeDate = () => {
    if (allDates.length > 1) {
      const start = new DateObject(allDates[0])
        .convert(gregorian, gregorian_en)
        .format("YYYY-MM-DD");
      const end = new DateObject(allDates[allDates.length - 1])
        .convert(gregorian, gregorian_en)
        .format("YYYY-MM-DD");

      dispatch(
        handleFilterDate({
          startDate: start,
          endDate: end,
        })
      );
    }
  };

  useEffect(() => {
    handleRangeDate();
  }, [dates]);

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
      <Card className="overflow-hidden">
        <HeaderTable
          toggleSidebar={toggleCreateModal}
          rowOfPage={params.RowsOfPage}
          handleRowOfPage={handleRows}
          buttonText={"افزودن بازه زمانی"}
          toggleFilter={toggleFilterModal}
          isSearching={false}
        />
        <Row>
          <Col sm="9">
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
                        toggleModal={toggleEditModal}
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
          <Col sm={3}>
            <Calendar
              range
              value={dates}
              onChange={(dateObjects) => {
                setDates(dateObjects);
                setAllDates(getAllDatesInRange(dateObjects));
              }}
              calendar={persian}
              locale={persian_fa}
              plugins={[
                weekends(),
                <DatePanel
                  style={{ padding: "0px" }}
                  markFocused
                  position="bottom"
                />,
                <DatePickerHeader position="top" size="medium" />,
              ]}
            />
          </Col>
        </Row>
      </Card>
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
    </div>
  );
};

export default SchedualListWrapper;
