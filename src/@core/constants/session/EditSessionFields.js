export const EditSessionFields = (detail) => {
  const fields = {
    scheduleSessionId: detail.scheduleSessionId ?? "",
    sessionTitle: detail.sessionTitle ?? "",
    sessionDescribe: detail.sessionDescribe ?? "",
  };

  return fields;
};
