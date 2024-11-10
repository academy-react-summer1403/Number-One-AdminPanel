import { useDispatch } from "react-redux";
import { getUserList } from "../../../../core/services/api/user";
import { useEffect } from "react";

// Get Users With Different Roles
const getUsers = (action, role) => {
  const dispatch = useDispatch();

  const getUsersList = async () => {
    const list = await getUserList(role);
    dispatch(action(list));
  };

  useEffect(() => {
    getUsersList();
  }, []);
};

export default getUsers;
