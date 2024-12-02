export const EditDepartmentFields = (detail) => {
  const fields = {
    id: detail.id ?? "",
    depName: detail.depName ?? "",
    buildingId: detail.buildingId ?? "",
  };

  return fields;
};
