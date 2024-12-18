import http from "../../interceptor";

const UserDetails = async (id) => {
  if (id) {
    try {
      const response = await http.get(`User/UserDetails/${id}`);
      return response;
    } catch {
      return false;
    }
  }
};

export default UserDetails;
