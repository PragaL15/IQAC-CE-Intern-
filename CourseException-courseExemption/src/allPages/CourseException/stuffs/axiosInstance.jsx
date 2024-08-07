import axios from 'axios';
import { apiBaseUrl } from '../../../api/api'; // Adjust the path as necessary

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Token expired or unauthorized. Redirecting to login.');
        window.location.href = '/'; // Redirect to login page
      } else {
        console.log(`Error: ${error.response.status}. Redirecting to login.`);
        window.location.href = '/'; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
