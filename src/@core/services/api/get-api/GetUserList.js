import http from "../../interceptor";

const GetUserList = async (params) => {
  try {
    const result = await http.get("/User/UserMannage", { params: params });
    return result;
  } catch (error) {
    return [];
  }
};

export default GetUserList;
