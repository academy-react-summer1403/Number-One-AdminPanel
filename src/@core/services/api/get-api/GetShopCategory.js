import axios from "axios";

const GetShopCategory = async (id) => {
  try {
    const response = await axios.get(
      `https://6747054d38c8741641d5120e.mockapi.io/shop_Categories/${id}`
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    return "";
  }
};

export default GetShopCategory
