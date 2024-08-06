import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.message;
      if (errorMessage === 'TokenExpired') {
        // Redirect to login page after next API request
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
