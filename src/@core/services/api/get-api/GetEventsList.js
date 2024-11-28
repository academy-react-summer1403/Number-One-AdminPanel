import axios from "axios";

const GetEventsList = async (params) => {
  try {
    let url = new URL("https://67278458270bd0b97552ba83.mockapi.io/Events");
    url.searchParams.append("title", params.Query ? params.Query : "");
    url.searchParams.append("isActive", params ? params.isActive : true);
    url.searchParams.append("page", params.PageNumber ? params.PageNumber : 1);
    url.searchParams.append(
      "limit",
      params.RowsOfPage ? params.RowsOfPage : 15
    );
    url.searchParams.append("sortby", params ? params.SortingCol : null);

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return [];
  }
};

export default GetEventsList;
