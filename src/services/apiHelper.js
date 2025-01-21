/**
 * @author Abdul Qawi Bin Kamran 
 * @version 0.0.1
 */

import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use((config)=> {
    console.info(`apiHelper>baseUrl: ${process.env.REACT_APP_API_BASE_URL}`)
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers.Authorization = token; 
    }
    return config; 
});

apiClient.interceptors.response.use(
    (response) => {
        if(response.data.success) {
            return response.data.data;
        } else {
            return Promise.reject(new Error(response.data.message || 'Unknown error'))
        }
    }, 
    (error) => {
        return Promise.reject(error); 
    }
)

export default apiClient;