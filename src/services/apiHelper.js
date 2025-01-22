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
            const err = new Error(response.data.message); 
            err.statusCode = response.status; 
            return Promise.reject(err); 
        }
    }, 
    (error) => { 
        const err = new Error(error.message); 
        err.data = error.response.data;
        err.statusCode = error.status; 
        return Promise.reject(err); 
    }
)

export default apiClient;