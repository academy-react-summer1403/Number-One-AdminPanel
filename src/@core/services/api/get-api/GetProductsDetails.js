import axios from "axios";

const GetProductsDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://673cfd8a4db5a341d833a52f.mockapi.io/Products/${id}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export default GetProductsDetails;
