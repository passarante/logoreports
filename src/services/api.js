import axios from 'axios';
import { API_URL } from '../constants/index';



export const apiService = axios.create({
  baseURL: API_URL
});


