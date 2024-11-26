import axios from "axios";

const GetAllProducts = async () => {
  try {
    const response = await axios.get(
      "https://673cfd8a4db5a341d833a52f.mockapi.io/Products"
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export default GetAllProducts;
