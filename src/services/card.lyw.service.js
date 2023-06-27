import axios from 'axios';

//const API_URL = 'https://leadyourway.azurewebsites.net/api';
const API_URL = 'http://localhost:5188/api';

const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
  },
});

export default class CardService {
  async getAll() {
    return http.get('/card');
    const response = await axios.get(API_URL);
    return response.data;
  }

  async getById(id) {
    return http.get('/card/' + id);
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }

  async getByUserId(id) {
    return http.get('/card/filterByUserId/' + id);
    const response = await axios.get(`${API_URL}/filterByUserId/${id}`);
    return response.data;
  }

  async create(card) {
    return http.post('/card', card);
    return axios.post(API_URL, card);
  }

  async update(card) {
    return axios.put(`${API_URL}/${card.id}`, card);
  }

  async delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export const cardService = new CardService();
