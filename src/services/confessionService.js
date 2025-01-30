import apiClient from "./apiHelper";

class ConfessionService {
    static async getAllTags() {
        try {
            const res = await apiClient.get('/confession/getAllTags');
            return res; 
        } catch (err) {
            throw err; 
        }
    }

    static async createConfession(title, body, tagIds) {
        try {
            const res = await apiClient.post('/confession/createConfession', {title, body, tagIds}); 
            return res; 
        } catch (err) {
            throw err; 
        }
    }

    static async getPendingConfessions() {
        try {
            const res = await apiClient.get('/confession/getPendingConfessions'); 
            return res; 
        } catch (err) {
            throw err; 
        }
    }

    static async publishConfession(confessionId) {
        try {
            await apiClient.post('/confession/publishConfession', {confessionId}); 
        } catch (err) {
            throw err; 
        }
    }

    static async rejectConfession(confessionId) {
        try {
            await apiClient.post('/confession/rejectConfession', {confessionId}); 
        } catch (err) {
            throw err;
        }
    }
}

export default ConfessionService; 