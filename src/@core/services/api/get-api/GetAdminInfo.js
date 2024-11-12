import http from "../../interceptor";

const GetAdminInfo = async (id) => {
  try {
    const response = await http.get(`User/UserDetails/${id}`);
    return response;
  } catch (error) {
    return [];
  }
};

export default GetAdminInfo;
