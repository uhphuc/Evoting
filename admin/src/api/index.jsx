import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }  
    return config;
  }
);


export default api;