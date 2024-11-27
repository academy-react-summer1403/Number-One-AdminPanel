import axios from "axios";

const GetShopCategories = async () => {
  try {
    const response = await axios.get(
      "https://6747054d38c8741641d5120e.mockapi.io/shop_Categories"
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export default GetShopCategories;
