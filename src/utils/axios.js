import axios from 'axios';

// Define the URL for the backend server.
const backendUrl= "https://todo-server-123-4f16fd2da272.herokuapp.com"

// Log the backend URL to the console for reference.
console.log("Backend URL "  , backendUrl);

// Create an instance of the 'axios' library with custom settings.
const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default axiosInstance;

