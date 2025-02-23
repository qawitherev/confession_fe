/**
 * @description This file contains all API call to the api/user/*
 * @author Abdul Qawi Bin Kamran
 * @version 0.0.1
 */

import apiClient from "./apiHelper";

class UserService {
    static async signUp(username, nickname, password) {
        try {
            const res = await apiClient.post('/user/signUp', {username, nickname, password});
            return res;
        } catch (err) {
            throw err; 
        }
    }

    static async login(username, password) {
        try {
            const res = await apiClient.post('/user/login', {username, password}); 
            return res; 
        } catch (err) {
            throw err; 
        }
    }

    static async getUsers(searchKeyword, page, pageSize) {
        try {
            const res = await apiClient.get('/user/getUsers', 
                {
                    params: {
                        searchKeyword,
                        page, 
                        pageSize
                    }
                }
            );
            return res; 
        } catch (err) {
            throw err; 
        }
    }
} 

export default UserService; 