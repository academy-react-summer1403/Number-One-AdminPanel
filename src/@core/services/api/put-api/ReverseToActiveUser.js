import http from "../../interceptor";

const ReverseToActiveUser = async (id) => {
  try {
    const response = await http.put("/User/ReverseToActiveUser", {
      data: { userId: id },
    });
    return response;
  } catch (error) {
    return [];
  }
};

export default ReverseToActiveUser;
