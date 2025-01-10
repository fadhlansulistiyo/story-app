import Config from './config';

const ApiEndpoint = {
  REGISTER: `${Config.BASE_URL}/register`,
  LOGIN: `${Config.BASE_URL}/login`,

  GET_ALL_STORIES: `${Config.BASE_URL}/stories`,
  GET_DETAIL_STORY: (id) => `${Config.BASE_URL}/stories/${id}`,
  ADD_STORY: `${Config.BASE_URL}/stories`,
  ADD_STORY_GUEST: `${Config.BASE_URL}/stories/guest`,
};

export default ApiEndpoint;
