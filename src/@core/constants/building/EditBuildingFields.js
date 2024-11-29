export const EditBuildingFields = (detail) => {
  const fields = {
    id: detail.id ?? "",
    buildingName: detail.buildingName ?? "",
    workDate: detail.workDate ?? "",
    floor: detail.floor ?? "",
    active: detail.active ?? "",
    latitude: detail.latitude ?? "",
    longitude: detail.longitude ?? "",
  };

  return fields;
};
