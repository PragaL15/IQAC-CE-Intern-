// apiClient.js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Your backend base URL
  withCredentials: true, // Include cookies in requests
});

// Add a response interceptor to handle 401 errors (unauthorized or token expiration)
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token is expired or not valid
      alert('Session expired. Redirecting to login page.');
      window.location.href = 'http://localhost:5173'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;
