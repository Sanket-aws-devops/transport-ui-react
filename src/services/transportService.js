import axios from 'axios';

const BASE_URL = 'http://your-api-base-url';

export const transportService = {
  addBus: async (busData) => {
    try {
      const response = await axios.post(`${BASE_URL}/bus`, busData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateBus: async (busId, busData) => {
    try {
      const response = await axios.put(`${BASE_URL}/bus?busId=${busId}`, busData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getBuses: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bus`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 