import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (UserToken) => {
  token = `Bearer ${UserToken}`;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  let data = await axios.delete(`${baseUrl}/${id}`, config);
  return data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  let data = await axios.post(baseUrl, newBlog, config);
  return data;
};

const likeBlog = async (id) => {
  console.log(id);
  const config = {
    headers: { Authorization: token },
  };
  let data = await axios.put(`${baseUrl}/${id}`, config);
  console.log(data, id);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createBlog, likeBlog , deleteBlog};
