import http from "../../interceptor";

const GetNewsCategoryWithId = async (id) => {
  try {
    const response = await http.get(`/News/GetNewsCategory/${id}`);
    return response;
  } catch (error) {
    return null;
  }
};

export default GetNewsCategoryWithId;
