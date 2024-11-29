export const EditClassFields = (detail) => {
  const fields = {
    id: detail.id ?? "",
    classRoomName: detail.classRoomName ?? "",
    capacity: detail.capacity ?? "",
    buildingId: detail.buildingId ?? "",
  };

  return fields;
};
