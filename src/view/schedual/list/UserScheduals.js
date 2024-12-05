import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import GetAdminScheduals from "../../../@core/services/api/get-api/GetAdminScheduals";
import { handleData, handleRowsOfPage } from "../store";
import { HeaderTable } from "../../../@core/components/table-list";
import { Button, Card, Col, Row, Table } from "reactstrap";
import headerTable from "../../../@core/constants/schedual/HeaderTable";
import CustomPagination from "../../../@core/components/pagination";
import TableItems from "./TableItems";
import ModalSchedule from "../create/ModalSchedule";
import SchedualCalendar from "./Calendar";
import {
  GetUserList,
  GetUserSchedual,
} from "../../../@core/services/api/get-api";
import {
  handleDataUser,
  handleFilterDateUser,
  handleRowsOfPageUser,
} from "../store/SchedualUser";
import ModalApiItemList from "../../../@core/components/modal/ModalApiItemList";
import { handlePageNumber, handleQuery } from "../../user/store/FilterSlice";
import UserTableItems from "../../courses/view/tabs/CourseAssistance/UserTableItems";

const UserSchedualWrapper = () => {
  const params = useSelector((state) => state.SchedualUserSlice);
  const userParams = useSelector((state) => state.FilterSlice);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [scheduleDetails, setScheduleDetails] = useState(undefined);
  const [variantState, setVariantState] = useState(undefined);
  const [userid, setUserid] = useState();

  const {
    data: scheduals,
    isSuccess,
    refetch,
    isRefetching,
  } = useQueryWithDependencies(
    "GET_USER_SCHEDUAL_LIST",
    GetUserSchedual,
    params,
    {
      startDate: params?.startDate,
      endDate: params?.endDate,
      StudentId: userid,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleDataUser(scheduals));
    }
  }, [isSuccess, isRefetching]);

  // Getting the desired item data
  const handleStatusDetail = () => {
    const detail =
      scheduals.length > 0 && scheduals.find((item) => item.id == id);
    setScheduleDetails(detail);
  };

  useEffect(() => {
    if (isSuccess) {
      handleStatusDetail();
    }
  }, [id]);

  useEffect(() => {
    refetch();
  }, [userid]);

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

  // Filter Modal
  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);

  // Handle RowOfPage for list
  const handleRows = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(handleRowsOfPageUser(value));
  };

  // Empty data after closing the modal every time
  useEffect(() => {
    if (!showModal) {
      setScheduleDetails(undefined);
      setId("");
    }
  }, [showModal]);

  // Get All Users
  const { data: users } = useQueryWithDependencies(
    "GET_USER_LIST",
    GetUserList,
    userParams,
    userParams
  );

  const userTableHeader = ["", "نام کاربر", "ایمیل کاربر", "عملیات"];

  // Choose User Modal
  const [chooseUserModal, setChooseUserModal] = useState(false);
  const toggleChooseUserModal = () => setChooseUserModal(!chooseUserModal);

  return (
    <div className="app-user-list">
      <Card className="overflow-hidden">
        <Row className="px-2">
          <Col sm="8">
            <div className="react-dataTable overflow-hidden">
              <div className="d-flex align-items-center">
                <HeaderTable
                  isCreate={false}
                  toggleSidebar={toggleShowModal}
                  setScheduleDetails={setScheduleDetails}
                  rowOfPage={params.RowsOfPage}
                  handleRowOfPage={handleRows}
                  buttonText={"افزودن بازه زمانی"}
                  toggleFilter={toggleFilterModal}
                  setVariantState={setVariantState}
                  isSearching={false}
                />
                <Button
                  className="add-new-user btn"
                  color="primary"
                  style={{ width: "130px", height: "39px", marginTop: "10px" }}
                  onClick={toggleChooseUserModal}
                >
                  انتخاب کاربر
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
                  {params.FilteredData.length > 0 &&
                    params.FilteredData?.slice(itemOffset, endOffset)?.map(
                      (item, index) => (
                        <TableItems
                          key={index}
                          refetch={refetch}
                          item={item}
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
            <SchedualCalendar handleFilterDate={handleFilterDateUser} />
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
      <ModalApiItemList
        PageNumber={userParams.PageNumber}
        RowsOfPage={userParams.RowsOfPage}
        isOpen={chooseUserModal}
        toggle={toggleChooseUserModal}
        handlePageNumber={handlePageNumber}
        handleQuery={handleQuery}
        modalTitle={"منتور را انتخاب کنید"}
        totalCount={users?.totalCount}
        headerTitles={userTableHeader}
      >
        {users?.listUser?.map((item, index) => (
          <UserTableItems
            item={item}
            toggle={toggleChooseUserModal}
            key={index}
            setId={setUserid}
          />
        ))}
      </ModalApiItemList>
    </div>
  );
};

export default UserSchedualWrapper;
