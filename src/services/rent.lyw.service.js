import axios from 'axios';

const API_URL = 'https://leadyourway.azurewebsites.net/api/rent';
//const API_URL = 'http://localhost:5188/api/rent';

export default class RentService {
  async bikeAvailable(id, start, end) {
    const response = await axios.get(`${API_URL}/available/${id}?start=${start}&end=${end}`);
    return response.data;
  }

  async create(rent) {
    return axios.post(API_URL, rent);
  }
}

export const rentService = new RentService();
