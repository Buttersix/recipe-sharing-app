import axios from 'axios';
import API_URL from './apiConfig';

const newRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export default newRequest;