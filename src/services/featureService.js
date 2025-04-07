/**
 * Feature Service
 * This service handles the api call to the feature endpoints 
 */

const { default: apiClient } = require("./apiHelper");

class FeatureService {
    static async getAllFeaturesStatus() {
        try {
            const res = await apiClient.get('/feature/getAllFeaturesStatus');
            return res;
        } catch (err) {
            throw err;
        }
    }

    static async updateFeatureStatus(id, status) {
        try {
            const res = await apiClient.post('/feature/updateFeatureStatus', {
                id,
                status
            });
            return res;
        } catch (err) {
            throw err;
        }
    }
}

export default FeatureService;