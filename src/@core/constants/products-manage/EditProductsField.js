const EditProductsFields = (detail) => {
  const fields = {
    id: detail.id ?? "",
    title: detail.title ?? "",
    miniDiscribe: detail.miniDiscribe ?? "",
    googleTitle: detail.googleTitle ?? "",
    googleDiscribe: detail.googleDiscribe ?? "",
    categoryId: detail.categoryId ?? "",
    discount: detail.discount ?? "",
    shopId: detail.shopId ?? "",
    exist: detail.exist ?? "",
    price: detail.price ?? "",
    special: detail.special ?? "",
  };

  return fields;
};

export default EditProductsFields;
