import http from "../../interceptor";

const GetUserList = async (params) => {
  // console.log(params)
  try {
    const result = await http.get("/User/UserMannage", { params: params });
    return result;
  } catch (error) {
    return [];
  }
};

export default GetUserList;
