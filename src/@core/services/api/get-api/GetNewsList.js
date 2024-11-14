import http from "../../interceptor";

const GetNewsList = async (params) => {
  try {
    const response = await http.get("/News/AdminNewsFilterList", {
      params: params,
    });
    return response;
  } catch {
    return [];
  }
};

export default GetNewsList;
