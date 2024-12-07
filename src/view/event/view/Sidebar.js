// ** React Imports
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";

// Customize
import fallback from "../../../assets/images/portrait/small/events.png";
import ImageFallback from "../../../@core/components/image-fallback";

// ** Third Party Components
import classnames from "classnames";

// ** Reactstrap Imports
import { useQueryWithoutDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetAllEvents } from "../../../@core/services/api/get-api";

const EventSidebar = () => {
  const [related, setRelated] = useState([]);

  const { data, isSuccess } = useQueryWithoutDependencies(
    "GET_EVENTS",
    GetAllEvents
  );

  const { id } = useParams();

  useEffect(() => {
    if (isSuccess) {
      setRelated(data.filter((item) => item.isActive == true && item.id != id));
    }
  }, [isSuccess]);

  const renderRecentPosts = () => {
    return related?.slice(0, 4).map((post, index) => {
      return (
        <div
          key={index}
          className={classnames("d-flex", {
            "mb-2": index !== related?.length - 1,
          })}
        >
          <Link className="me-2" to={`/events/view/${post.id}`}>
            <ImageFallback
              width="100"
              height="70"
              className="rounded"
              fallback={fallback}
              src={data.currentImageAddressTumb}
            />
          </Link>
          <div>
            <h6 className="blog-recent-post-title">
              <Link
                className="text-body-heading"
                to={`/events/view/${post.id}`}
                style={{
                  width: "130",
                  height: "45px",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {post.title}
              </Link>
            </h6>
            <div className="text-muted mb-0">{post.startEventTime}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            {related !== null ? (
              <Fragment>
                <div className="blog-recent-posts">
                  <h6 className="section-label fs-4">ایونت های دیگر</h6>
                  <div className="mt-75">
                    {related.length > 0 ? (
                      renderRecentPosts()
                    ) : (
                      <h6
                        className="section-label fs-6 mt-5"
                        style={{ textAlign: "center" }}
                      >
                        ایونتی وجود ندارد
                      </h6>
                    )}
                  </div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSidebar;
