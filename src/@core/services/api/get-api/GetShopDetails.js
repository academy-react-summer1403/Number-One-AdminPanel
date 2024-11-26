import axios from "axios";

const GetShopDetails = async (id) => {
  try {
    const result = await axios.get(
      `https://6653aa591c6af63f46754aa6.mockapi.io//users/${id}`
    );
    return result.data;
  } catch (error) {
    return [];
  }
};

export default GetShopDetails;
