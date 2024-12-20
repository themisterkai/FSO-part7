import blogService from './blogs';
import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl, blogService.getConfig());
  return response.data;
};

export default { getAll };
