import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (token) => {
  token = `Bearer ${token}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const createBlog = async (newBlog) => {
   const config = {
    headers: { Authorization: token },
  }
  let data = await axios.post(baseUrl, newBlog, config)
  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken };
