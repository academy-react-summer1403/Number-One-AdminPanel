import axios from "axios";

const GetShopList = async () => {
  try {
    const result = await axios.get(
      "https://6653aa591c6af63f46754aa6.mockapi.io/users"
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetShopList;
