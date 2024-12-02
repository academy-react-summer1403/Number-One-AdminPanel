// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";
import { Search } from "react-feather";

// ** Reactstrap Imports
import { InputGroup, InputGroupText, Input } from "reactstrap";
import RenderUserChats from "./RenderUserChats";
import { useGetItem } from "../../../utility/hooks/useLocalStorage";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";

// Api
import { UserDetails } from "../../services/api/get-api";
import { handleQuery } from "../../../view/support/store";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const params = useSelector((state) => state.SupportSlice);
  const dispatch = useDispatch();
  const id = useGetItem("id") && useGetItem("id");
  const location = useLocation();

  // Get Supporter Details
  const { data: supporter } = useQueryWithDependencies(
    "GET_SUPPORTER_DETAILS",
    UserDetails,
    id,
    id
  );

  const handleSearch = (ev) => {
    if (location.pathname.toLocaleLowerCase() === "/supportadmin") {
      dispatch(
        handleQuery({
          query: ev.target.value,
          section: "AdminUserList",
        })
      );
    } else {
      dispatch(
        handleQuery({
          query: ev.target.value,
          section: "TeacherUserList",
        })
      );
    }
  };

  return (
    <div className="sidebar-left">
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              <div className="sidebar-profile-toggle">
                <Avatar
                  className="avatar-border"
                  img={supporter?.currentPictureAddress}
                  status="online"
                  imgHeight="42"
                  imgWidth="42"
                />
              </div>
              <InputGroup className="input-group-merge ms-1 w-100">
                <InputGroupText className="round">
                  <Search className="text-muted" size={14} />
                </InputGroupText>
                <Input
                  value={params.Query}
                  className="round"
                  placeholder="جستجو..."
                  onChange={(ev) => {
                    handleSearch(ev);
                  }}
                />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar
            className="chat-user-list-wrapper list-group"
            options={{ wheelPropagation: false }}
            style={{ height: "480px" }}
          >
            <h4 className="chat-list-title">لیست کاربران</h4>
            <div className="chat-users-list chat-list media-list">
              <RenderUserChats />
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
