import {
  MoreVertical,
  Edit,
  Trash,
  FileText,
  Divide,
  Delete,
  Plus,
} from "react-feather";
import {
  Table,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Row, Col, Card, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../../@core/components/pagination";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import { CourseGroups } from "../../../../@core/constants/courses";
import { useMutationWithRefetch } from "../../../../utility/hooks/useCustomQuery";
import { DeleteCourseGroup } from "../../../../@core/services/api/delete-api";
import ModalGroup from "../ModalGroupe";

const CoursesGroups = ({ groupData, refetchGroup }) => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [variantState, setVariantState] = useState("");
  const [groupId, setGroupId] = useState(undefined);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigate = useNavigate();

  const { mutate: deleteGroup } = useMutationWithRefetch(
    "DELETE_COURSE_GROUPS",
    DeleteCourseGroup,
    refetchGroup
  );
  // Pagination
  const [PageNumber, setPageNumber] = useState(1);
  const [RowsOfPage, setRowsOfPage] = useState(8);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * RowsOfPage) % groupData?.length;
    setItemOffset(newOffset);
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <div className="d-flex mb-1">
        <Button
          className=" p-0 py-1 text-center d-flex align-items-center"
          style={{ width: "90px", direction: "ltr" }}
          color="primary"
          onClick={() => {
            setVariantState("add");
            setShowModal((old) => !old);
          }}
        >
          <Plus size={15} />
          <span className="mx-auto">ایجاد گروه</span>
        </Button>
      </div>
      <Card className="">
        <div className="react-dataTable">
          <Table hover style={{ overflow: "visible" }}>
            <HeaderTable titles={CourseGroups} />
            {groupData?.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr className="text-center">
                    <td className="p-0">{item.groupName}</td>
                    <td className=" p-0">{item.teacherName}</td>
                    <td className=" p-0">{item.groupCapacity}</td>
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
                          <DropdownItem
                            onClick={() => {
                              setVariantState("edit");
                              setGroupId(item.groupId);
                              setShowModal((old) => !old);
                            }}
                          >
                            <Edit className="me-50" size={15} />{" "}
                            <span className="align-middle">ویرایش</span>
                          </DropdownItem>
                          <DropdownItem divider className="p-0 m-0" />
                          <DropdownItem
                            onClick={() => deleteGroup(item.groupId)}
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
            })}
          </Table>
        </div>
      </Card>
      {groupData?.length == 0 ? (
        <div className="mx-auto my-8" style={{ textAlign: "center" }}>
          گروهی پیدا نشد
        </div>
      ) : null}
      <ModalGroup
        setShowModal={setShowModal}
        showModal={showModal}
        refetchGroup={refetchGroup}
        groupId={groupId}
        variant={variantState}
      />
      <CustomPagination
        total={groupData?.length}
        current={PageNumber}
        rowsPerPage={RowsOfPage}
        handleClickFunc={handleWithOutDispatch}
      />
    </Fragment>
  );
};

export default CoursesGroups;
