const EditNewsFields = (detail) => {
  const fields = {
    id: detail?.id ?? "",
    title: detail?.title ?? "",
    miniDescribe: detail?.miniDescribe ?? "",
    googleTitle: detail?.googleTitle ?? "",
    googleDescribe: detail?.googleDescribe ?? "",
    newsCatregoryId: detail?.newsCatregoryId ?? "",
    describe: detail?.describe ?? "",
    active: true,
    imageAddress: "",
    tumbImage: "",
    image: "",
    keyword: detail?.keyword ?? "",
  };

  return fields;
};

export default EditNewsFields;
