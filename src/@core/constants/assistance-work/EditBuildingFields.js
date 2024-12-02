export const EditAssWorkFields = (detail) => {
  const fields = {
    id: detail.workId ?? "",
    worktitle: detail.worktitle ?? "",
    workDescribe: detail.workDescribe ?? "",
    assistanceId: detail.id ?? "",
    workDate: detail.workDate ?? "",
  };

  return fields;
};
