import http from "../../interceptor";

const UpdateUser = async (user, refetch) => {
  try {
    const response = await http.put("/User/UpdateUser", user);
    if (response.success) {
      refetch();
    }
    return response;
  } catch {
    return [];
  }
};

export default UpdateUser;
