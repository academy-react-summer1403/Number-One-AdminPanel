const EditShopFields = (detail) => {
  const fields = {
    name: detail.name ?? "",
    category: detail.category ?? "",
    address: detail.address ?? "",
    startTime: detail.startTime ?? "",
    endTime: detail.endTime ?? "",
    aboutUs: detail.aboutUs ?? "",
    img: detail.img ?? "",
  };
  return fields;
};

export default EditShopFields;
