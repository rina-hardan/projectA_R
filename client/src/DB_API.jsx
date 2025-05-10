
import axios from 'axios';
export const FAILED = 0, SUCCESS = 1, NOT_FOUND = 2;


const BASE_URL = 'http://localhost:5000/api';

export const sendRequest = async ({ method, url, params = {}, body = null, headers = {} }) => {
  const config = {
    method,
    url: `${BASE_URL}${url}`,
    params, 
    data: body, 
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  try {
    const response = await axios(config);
    return { data: response.data, status: 'SUCCESS' };
  } catch (error) {
    console.error(error);
    return { data: null, status: 'FAILED' };
  }
};









