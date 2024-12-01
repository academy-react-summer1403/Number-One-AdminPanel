import axios from "axios";

const GetShopCategoriesList = async (params) => {
  // console.log(params);
  try {
    const url = new URL(
      "https://6747054d38c8741641d5120e.mockapi.io/shop_Categories"
    );
    url.searchParams.append("page", params.PageNumber ? params.PageNumber : 1);
    url.searchParams.append(
      "limit",
      params.RowsOfPage ? params.RowsOfPage : 15
    );
    url.searchParams.append("categoryName", params.Query ? params.Query : "");
    const response = await axios.get(url);
    // console.log( response.data)
    return response.data;
  } catch (error) {
    return [];
  }
};

export default GetShopCategoriesList;
