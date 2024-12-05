export const CloseDateFields = (detail) => {
  const fields = {
    startCloseDate: detail.startCloseDate ?? "",
    endCloseDate: detail.endCloseDate ?? "",
    termId: detail.termId ?? "",
    closeReason: detail.closeReason ?? "",
  };

  return fields;
};
