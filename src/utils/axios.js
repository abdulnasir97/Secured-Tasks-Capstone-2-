import axios from 'axios';

const backendUrl= "https://todo-server-123-4f16fd2da272.herokuapp.com"
console.log("Backend URL "  , backendUrl);

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default axiosInstance;

