import axios from "axios";

const baseUrl = "/api/login";

const loginService = async (credentials) => {
  let res = await axios.post(baseUrl, credentials);
  return res;
};

export default loginService;