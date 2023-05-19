import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36557566-6ba75e1a2acc62b457c544e60';

export default class PhotoAPI {
  constructor(pageSize = 40) {
    this.page = 1;
    this.per_page = pageSize;
    this.lastQuery = '';
  }

  async getPhotosByQuery(query) {
    if (query === '') throw new Error('No Query');
    this.lastQuery = query;

    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.per_page,
      },
    });

    if (response.data.totalHits === 0) throw new Error('No Data');
    if (response.data.hits.length === 0) throw new Error('Limit Reached');

    this.page += 1;

    return response.data;
  }

  getNewPhotos() {
    return this.getPhotosByQuery(this.lastQuery);
  }

  resetPage() {
    this.page = 1;
  }
}
