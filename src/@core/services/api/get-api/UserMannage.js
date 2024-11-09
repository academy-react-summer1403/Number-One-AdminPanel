import http from "../../interceptor";

const UserManage = async (params) => {
  try {
    const apiParams = {
      PageNumber: params.PageNumber,
      RowsOfPage: params.RowsOfPage,
      SortingCol: params.SortingCol ? params.SortingCol.value : null,
      SortType: params.SortType ? params.SortType.value : null,
      Query: params.Query,
      IsActiveUser: params.IsActiveUse ? params.IsActiveUse.value : null,
      IsDeletedUser: params.IsDeletedUser ? params.IsDeletedUser.value : null,
      roleId: params.roleId ? params.roleId.value : null,
    };

    const result = await http.get("/User/UserMannage", { params: apiParams });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default UserManage;
