// Icon
import { Eye } from "react-feather";

// ** React Imports
import { Fragment, useState } from "react";

// // ** Reactstrap Imports
import { Card, Table } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// Custom Components
import ReplyNewsComment from "./ReplyNewsComments";
import CommentNewsModal from "./CommentNewsModal";

const CommentTab = ({ newsCom, NewsRepById, repCom }) => {
  const [repModal, setRepModal] = useState(false);
  const [comnttView, setComnttView] = useState(false);

  return (
    <Fragment>
      <Card>
        <div className="react-dataTable">
          <Table hover>
            <thead>
              <tr>
                <th className=" ">کاربر</th>
                <th className=" px-0">عنوان کامنت</th>
                <th className=" px-0">متن کامنت</th>
                <th className=" px-0">پاسخ ها</th>
              </tr>
            </thead>
            <tbody>
              {newsCom.length > 0 &&
                newsCom.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ maxWidth: "120px" }} className=" px-1">
                        {item?.autor}
                      </td>
                      <td
                        className="px-0 "
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "120px"
                        }}
                      >
                        {item?.title}
                      </td>
                      <td style={{ maxWidth: "160px" }} className=" p-0">
                        {item.describe}
                      </td>

                      <td className=" px-1">
                        {item?.replyCount > 0 && (
                          <Eye
                            style={{ width: "18px", height: "18px" }}
                            onClick={() => {
                              setComnttView(!comnttView), NewsRepById(item?.id);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {newsCom.length == 0 && (
            <span
              className="my-2 w-100 text-center"
              style={{ display: "block" }}
            >
              کامنتی وجود ندارد
            </span>
          )}
        </div>
      </Card>
      <ReplyNewsComment repShow={repModal} setRepShow={setRepModal} />
      <CommentNewsModal
        setComModal={setComnttView}
        comModal={comnttView}
        repCom={repCom}
      />
    </Fragment>
  );
};

export default CommentTab;
