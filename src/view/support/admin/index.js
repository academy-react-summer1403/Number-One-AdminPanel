// Styles
import "@styles/base/pages/app-chat.scss";
import "@styles/base/pages/app-chat-list.scss";

// Customize
import { Sidebar, ChatLog } from "../../../@core/components/chat";

const AdminChats = () => {
  return (
    <div className="chat-application d-flex">
      <Sidebar />
      <div className="content-right">
        <div className="content-wrapper h-100">
          <div className="content-body h-100">
            <ChatLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChats;
