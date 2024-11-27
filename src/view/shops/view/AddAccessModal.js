// ** Reactstrap Imports
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, Card, Button, Table } from "reactstrap";
import Avatar from "@components/avatar";
import avatarImg from "@src/assets/images/portrait/small/ee.jpg";
import avatarMenImg from "@src/assets/images/portrait/small/jpmen.jpg";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetUserList } from "../../../@core/services/api/get-api";
import { handleAllUser } from "../../user/store/UserInfoSlice";
import HeaderTable from "../../../@core/components/header-table/HeaderTable";
import { ShopAdminsTableTitles } from "../../../@core/constants/shops";
import { handlePageNumber, handleQuery } from "../../user/store/FilterSlice";
import { UpdateShop } from "../../../@core/services/api/put-api";
import CustomPagination from "../../../@core/components/pagination";
import { ListSearchbar } from "../../../@core/components/products-list";

const AddAccessModal = ({
  showModal,
  setShowModal,
  refetch,
  data,
  // groupId,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Getting data from redux
  const userList = useSelector(
    (state) => state.UserInfoSlice?.allUsers?.listUser
  );
  const userParams = useSelector((state) => state.FilterSlice);
  const totalCount = useSelector(
    (state) => state.UserInfoSlice?.allUsers?.totalCount
  );

  const handleWithDispatch = (page) => {
    dispatch(handlePageNumber(page.selected + 1));
  };

  // Get All Users
  const { data: users, isSuccess } = useQueryWithDependencies(
    "GET_USER_LIST",
    GetUserList,
    userParams,
    userParams,
    showModal === true
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleAllUser(users));
    }
  }, [isSuccess, users, dispatch]);
  useEffect(() => {
    if (!showModal) dispatch(handleQuery(undefined));
  }, [showModal]);

  const handleAddAdmin = (id) => {
    const userId = data?.permissionIds.find((Id) => Id == id);
    if (userId) toast.error("کاربر از قبل دسترسی ادمین دارد");
    else {
      data?.permissionIds.push(String(id));
      const newPermissionIds = [...data.permissionIds];
      // console.log(newPermissionIds)
      UpdateShop(data.id, { permissionIds: newPermissionIds }, refetch);
    }
  };

  // Check if screen width is less than 'md'
  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });

  return (
    <>
      <div className="vertically-centered-modal bg-black">
        <Modal
          className={`modal-dialog-centered ${
            isMobile ? "modal-fullscreen" : "modal-lg"
          }`}
          isOpen={showModal}
          toggle={() => setShowModal(!showModal)}
        >
          <ModalHeader toggle={() => setShowModal(!showModal)}>
            لیست کاربران جهت افزودن دسترسی به ادمین
          </ModalHeader>
          <ListSearchbar QueryFunction={handleQuery} width={"px-1"} />
          <ModalBody>
            <Card style={{ width: "100%" }}>
              <Table hover>
                <HeaderTable titles={ShopAdminsTableTitles} />
                <tbody>
                  {userList && userList.length > 0 ? (
                    userList.map((item, index) => (
                      <tr
                        className="text-center"
                        key={index}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <td style={{ width: "100px" }} className="px-0">
                          {item.gender ? (
                            <Avatar img={avatarMenImg} />
                          ) : (
                            <Avatar img={avatarImg} />
                          )}
                        </td>
                        <td className="px-0">
                          {item?.fname} {item?.lname}
                        </td>
                        <td className="px-0">{item?.gmail}</td>
                        <td>
                          <Button
                            className="p-0 py-1 text-center bg-black"
                            style={{ width: "120px", float: "left" }}
                            color="primary"
                            onClick={() => {
                              setShowModal((old) => !old);
                              handleAddAdmin(item.id);
                            }}
                          >
                            <span className="mx-auto">افزودن دسترسی</span>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        هیچ کاربری موجود نیست
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </ModalBody>
          <CustomPagination
            total={totalCount}
            current={userParams.PageNumber}
            rowsPerPage={userParams.RowsOfPage}
            handleClickFunc={handleWithDispatch}
          />
        </Modal>
      </div>
    </>
  );
};
export default AddAccessModal;
