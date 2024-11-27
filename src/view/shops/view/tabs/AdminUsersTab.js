import { Fragment, useEffect, useState } from "react";
import { Button, Card, DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown } from "reactstrap";
import avatarImg from "../../../../assets/images/portrait/small/ee.jpg";
import avatarMenImg from "../../../../assets/images/portrait/small/jpmen.jpg";
import { Delete, Edit, FileText, MoreVertical } from "react-feather";
import Avatar from "@components/avatar";
import { Link } from "react-router-dom";
import { UserDetails } from "../../../../@core/services/api/get-api";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import { ShopAdminsTableTitles } from "../../../../@core/constants/shops";
import CustomPagination from "../../../../@core/components/pagination";
import { UpdateShop } from "../../../../@core/services/api/put-api";
import AddAccessModal from "../AddAccessModal";


const AdminUsersTab = ({ shopsData,refetch }) => {

  // Getting the details of users who have admin role
  const [permissionUsers, setPermissionUsers] = useState([]);
  const handleGetUser = async () => {
    if(shopsData && shopsData?.permissionIds){
      const users = [];
      // console.log(users)
      for (const userId of shopsData?.permissionIds) {
          const usersDetails = await UserDetails(userId)
          // console.log(usersDetails)
          users.push(usersDetails);
      }
      setPermissionUsers(users);
    }
  }
 
  // Function to remove admin access to the shop
  const deleteAdminFunc = async (id)=>{
    const existingUsers = shopsData.permissionIds?.filter(userId => userId != id )
    const result = await UpdateShop(shopsData.id,{permissionIds:existingUsers},refetch)
    }

  useEffect(() => {
    if (shopsData) {
      handleGetUser();
    }
  }, [shopsData]);

    // Pagination
    const [PageNumber, setPageNumber] = useState(1);
    const [RowsOfPage, setRowsOfPage] = useState(6);
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + RowsOfPage;
    const handleWithOutDispatch = (page) => {
      const newOffset = (page.selected * RowsOfPage) % paymentData?.length;
      setItemOffset(newOffset);
    };

    // show and hide modal
  const [showModal, setShowModal] = useState(false);
  const toggle = () => setShowModal(!editModal);


  return (
    <Fragment>
       <div className="d-flex justify-content-end mb-1">
        <Button
          className=" p-0 py-1 text-center"
          style={{ width: "90px",float:"left"}}
          color="primary"
          onClick={() => {
            // setVariantState("add");
            setShowModal((old) => !old);
          }}
        >
          <span className="mx-auto">افزودن ادمین</span>
        </Button>
      </div>
      <Card>
        <div className="react-dataTable">
          <Table hover>
            
            <HeaderTable titles={ShopAdminsTableTitles} />
            {shopsData && permissionUsers.length > 0 ? (
              permissionUsers.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr
                      className="text-center"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <td style={{ width: "100px" }} className="px-0">
                        {item.currentPictureAddress != null &&
                        item.currentPictureAddress != "Not-set" ? (
                          <Avatar img={item.currentPictureAddress} />
                        ) : item.gender ? (
                          <Avatar img={avatarMenImg} />
                        ) : (
                          <Avatar img={avatarImg} />
                        )}
                      </td>
                      <td className=" px-0">
                        {item?.fName} {item?.lName}
                      </td>
                      <td
                        className="px-0"
                      >
                        {item?.gmail}
                      </td>
                      <td>
                      <UncontrolledDropdown direction="start">
                        <DropdownToggle
                          className="icon-btn hide-arrow"
                          color="transparent"
                          size="sm"
                          caret
                        >
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu className="d-flex flex-column p-0">
                          <DropdownItem>
                            <FileText  className="me-50" size={15} />{" "}
                            <Link to={`/users/view/${item?.id}`} className="align-middle">جزئیات</Link>
                          </DropdownItem>
                          <DropdownItem divider className="p-0 m-0" />
                          <DropdownItem
                            onClick={() => deleteAdminFunc(item.id)}
                          >
                            <Delete className="me-50" size={15} />{" "}
                            <span className="align-middle">حذف</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <h6
                className="section-label fs-6"
                style={{
                  textAlign: "center",
                  marginTop: "200px",
                  marginBottom: "200px",
                }}
              >
                کاربری وجود ندارد
              </h6>
            )}
          </Table>
        </div>
      </Card>
      <AddAccessModal showModal={showModal} setShowModal={setShowModal} refetch={handleGetUser} data={shopsData}/>
      <CustomPagination
        total={permissionUsers?.length}
        current={PageNumber}
        rowsPerPage={RowsOfPage}
        handleClickFunc={handleWithOutDispatch}
      />
    </Fragment>
  );
};

export default AdminUsersTab;
