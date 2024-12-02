import { Fragment, useEffect, useState } from "react";
import { Edit, Plus, Users } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Table } from "reactstrap";
import { useQueryWithDependencies } from "../../../../utility/hooks/useCustomQuery";
import { GetSocialGroup } from "../../../../@core/services/api/get-api";
import { SocialGroupsTableTitle } from "../../../../@core/constants/courses/DetailsTabs";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import SocialModal from "../SocialCreateModal";

const SocialGroups = ({ courseId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [variantState, setVariantState] = useState("");
  const [groupId, setGroupId] = useState(undefined);
  const [groupsData, setGroupsData] = useState([]);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Getting data from Api with use Query
  const {
    data: SocialGroups,
    refetch,
    isRefetching,
    isSuccess,
  } = useQueryWithDependencies("GET_SOCIAL_GROUP", GetSocialGroup, null, null);

  // Getting social groups of the same period
  const getSocialCourseGroups = () => {
    const socialGroupData = SocialGroups?.filter((item) => item.courseId == id);
    // console.log(socialGroupData);
    setGroupsData(socialGroupData);
  };

  useEffect(() => {
    if (isSuccess) getSocialCourseGroups();
  }, [isSuccess, isRefetching]);

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
          <span className="mx-auto">ایجاد گروه مجازی</span>
        </Button>
      </div>
      <Card className="">
        <div className="react-dataTable">
          <Table hover style={{ overflow: "visible" }}>
            <HeaderTable titles={SocialGroupsTableTitle} />
            {groupsData?.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr className="text-center">
                    <td>
                      <Users />
                    </td>
                    <td className="p-0">{item.groupName}</td>
                    <td className=" p-0">{item.groupLink}</td>

                    <td
                      className="text-center"
                      onClick={() => {
                        setVariantState("edit");
                        setGroupId(item.id);
                        setShowModal((old) => !old);
                      }}
                    >
                      <span className="align-middle">ویرایش</span>
                      <Edit className="ms-50" size={15} />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
      </Card>
      {groupsData?.length == 0 ? (
        <div className="mx-auto my-8" style={{ textAlign: "center" }}>
          گروهی پیدا نشد
        </div>
      ) : null}
      <SocialModal
        setShowModal={setShowModal}
        showModal={showModal}
        refetchGroup={refetch}
        groupId={groupId}
        variant={variantState}
      />
    </Fragment>
  );
};

export default SocialGroups;
