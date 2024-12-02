export const EditTermFields = (detail) => {
  const fields = {
    id: detail.id ?? "",
    termName: detail.termName ?? "",
    departmentId: detail.departmentId ?? "",
    startDate: detail.startDate ?? "",
    endDate: detail.endDate ?? "",
    expire: detail.expire ?? false,
  };

  return fields;
};
