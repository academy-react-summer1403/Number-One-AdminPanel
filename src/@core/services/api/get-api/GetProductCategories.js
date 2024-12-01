import axios from "axios";

const GetProductCategories = async (params) => {
  // console.log(params);
  try {
    const url = new URL(
      "https://67448500b4e2e04abea28bf5.mockapi.io/Product-Category"
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

export default GetProductCategories;
