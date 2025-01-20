/**
 * @description This file contains all API call to the api/user/*
 * @author Abdul Qawi Bin Kamran
 * @version 0.0.1
 */

import axios from "axios";
import apiClient from "./apiHelper";

class UserService {
    static async signUp(username, nickname, password) {
        try {
            const res = await apiClient.post('/user/signUp');
            return res;
        } catch (err) {
            throw new Error(err.message || 'Failed to create confession');
        }
    }
} 

export default UserService; 