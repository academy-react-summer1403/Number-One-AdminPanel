export const EditEventFields = (detail) => {
  const fields = {
    title: detail.title ?? "",
    miniDescribe: detail.miniDescribe ?? "",
    describe: detail.describe ?? "",
    price: detail.price ?? "",
    currentImageAddress: detail.currentImageAddress ?? "",
    startEventTime: detail.startEventTime ?? "",
  };

  return fields;
};
