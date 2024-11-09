import http from "../../interceptor";

const UpdateUser = async (user) => {
  try {
    const response = await http.put("/User/UpdateUser", user);
    return response;
  } catch {
    return [];
  }
};

export default UpdateUser;
