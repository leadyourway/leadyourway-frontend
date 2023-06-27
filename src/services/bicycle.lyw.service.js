import axios from 'axios';

//const API_URL = 'https://leadyourway.azurewebsites.net/api/bicycle';
const API_URL = 'http://localhost:5188/api/bicycle';

const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
  },
});

export default class BicycleService {
  async getAll() {
    //return http.get();
    const response = await axios.get(API_URL);
    return response.data;
  }

  async getById(id) {
    //return http.get('/' + id);
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }

  async getByUserId(id) {
    //return http.get('/filterByUserId/' + id);
    const response = await axios.get(`${API_URL}/filterByUserId/${id}`);
    return response.data;
  }

  async create(bicycle) {
    //return http.post('', bicycle);
    return axios.post(API_URL, bicycle);
  }

  async update(bicycle) {
    return axios.put(`${API_URL}/${bicycle.id}`, bicycle);
  }

  async delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export const bicycleService = new BicycleService();
