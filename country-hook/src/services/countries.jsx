import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = async () => await axios.get(`${baseUrl}/all`).data;

const getCountry = async country => {
  const response = await axios.get(`${baseUrl}/name/${country}`);
  return response.data;
};

export { getAll, getCountry };
