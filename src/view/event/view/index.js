// React Imports
import { useParams } from "react-router-dom";
import { useState } from "react";

// Query
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";

// Api
import { GetEventDetail } from "../../../@core/services/api/get-api";

// Customize Component
import EditEvent from "./EditEvent";
import EventMain from "./Main";

const EventDetailWrapper = () => {
  const { id } = useParams();
  const [editModal, setEditModal] = useState(false);

  const { data, isSuccess, refetch } = useQueryWithDependencies(
    "GET_EVENT_DETAIL",
    GetEventDetail,
    id,
    id
  );

  const toggle = () => setEditModal(!editModal);

  return (
    <div className="app-user-view">
      <EventMain
        data={isSuccess && data}
        refetch={refetch}
        setEditModal={setEditModal}
      />
      <EditEvent
        data={isSuccess && data}
        refetch={refetch}
        isOpen={editModal}
        toggle={toggle}
      />
    </div>
  );
};

export default EventDetailWrapper;
