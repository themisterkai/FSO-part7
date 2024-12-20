import axios from 'axios';
const baseUrl = '/api/blogs';

let token = '';

const getConfig = () => ({
  headers: { Authorization: token },
});

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getTokenFromLS = async () => {
  const loggedInUser = window.localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    const userFromLS = JSON.parse(loggedInUser);
    setToken(userFromLS.token);
  }
};

const getAll = async () => {
  if (token === '') {
    await getTokenFromLS();
  }
  console.log('********', token);
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const create = async blogObject => {
  const response = await axios.post(baseUrl, blogObject, getConfig());
  return response.data;
};

const update = async blogObject => {
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    blogObject,
    getConfig()
  );
  return response.data;
};

const remove = async blogObject => {
  const response = await axios.delete(
    `${baseUrl}/${blogObject.id}`,
    getConfig()
  );
  return response.data;
};

export default { getAll, create, update, remove, setToken };
