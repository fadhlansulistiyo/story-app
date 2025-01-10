import axios from 'axios';
import ApiEndpoint from '../config/api-endpoint';
import Utils from '../utils/utils';
import Config from '../config/config';

const StoryApi = {
  async getAll({ page, size, location = 0 } = {}) {
    try {
      const response = await axios.get(ApiEndpoint.GET_ALL_STORIES, {
        headers: {
          Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
        },
        params: { page, size, location },
      });
      return response.data;
    } catch (error) {
      return StoryApi.handleError(error);
    }
  },

  async getById(id) {
    try {
      const response = await axios.get(ApiEndpoint.GET_DETAIL_STORY(id), {
        headers: {
          Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
        },
      });
      return response.data;
    } catch (error) {
      return StoryApi.handleError(error);
    }
  },

  async add({ description, photo, lat, lon } = {}, isGuest = false) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    if (lat) formData.append('lat', lat);
    if (lon) formData.append('lon', lon);

    const endpoint = isGuest ? ApiEndpoint.ADD_STORY_GUEST : ApiEndpoint.ADD_STORY;

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(isGuest
            ? {}
            : { Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}` }),
        },
      });
      return response.data;
    } catch (error) {
      return StoryApi.handleError(error);
    }
  },

  handleError(error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Something went wrong',
    };
  },
};

export default StoryApi;
