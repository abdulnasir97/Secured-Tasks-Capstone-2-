import axios from 'axios';

const backendUrl=process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("Backend URL "  , backendUrl);

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default axiosInstance;

