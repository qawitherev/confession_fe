import apiClient from "./apiHelper";

const REACTION_RELATE = 'Relate';
const REACTION_NOT_RELATE = 'Not Relate';

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

    static async getRejectedConfessions() {
        try {
            const res = await apiClient.get('/confession/getRejectedConfessions'); 
            return res; 
        } catch (err) {
            throw err; 
        }
    }

    static async getPublishedConfessions() {
        try {
            const res = await apiClient.get('/confession/getPublishedConfessions'); 
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

    static async getConfessions() {
        try {
            const res = await apiClient('/confession/getConfessions'); 
            return res; 
        } catch (err) {
            throw err; 
        }
    }

    static async relateConfession(confessionId) {
        try {
            await apiClient.post('/confession/reactConfession', {confessionId, reaction: REACTION_RELATE});
        } catch (err) {
            throw err; 
        }
    }

    static async notRelateConfession(confessionId) {
        try {
            await apiClient.post('/confession/reactConfession', {confessionId, reaction: REACTION_NOT_RELATE});
        } catch (err) {
            throw err; 
        }
    }
}

export default ConfessionService; 