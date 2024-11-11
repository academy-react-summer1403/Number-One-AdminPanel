import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetUserList } from "../../../@core/services/api/get-api";

// Get Users With Different Roles
const getUsers = (action, role) => {
  const dispatch = useDispatch();

  const getUsersList = async () => {
    const list = await GetUserList(role);
    dispatch(action(list));
  };

  useEffect(() => {
    getUsersList();
  }, []);
};

export default getUsers;
