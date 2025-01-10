import CheckUserAuth from './auth/check-user-auth';
import StoryApi from '../network/story-api';

const Home = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._showPlaceholders();
    await this._initialData();
  },

  async _initialData() {
    try {
      const response = await StoryApi.getAll();
      console.log(response);
      this._listStory = response.listStory;

      this._populateStoryDataToCard(this._listStory);
    } catch (error) {
      console.error('Failed to fetch list of stories:', error);
      const storyContainer = document.querySelector('#story-container');
      storyContainer.innerHTML = this._templateEmptyStory();
    }
  },

  _showPlaceholders() {
    const storyContainer = document.querySelector('#story-container');
    storyContainer.innerHTML = '';

    for (let i = 0; i < 5; i++) {
      const storyElement = document.createElement('story-item');
      storyElement.loading = true;
      storyElement.classes = i % 2 === 0 ? 'mb-3' : '';

      storyContainer.appendChild(storyElement);
    }
  },

  _populateStoryDataToCard(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(`Parameter listStory should be an object. The value is ${listStory}`);
    }

    if (!Array.isArray(listStory)) {
      throw new Error(`Parameter listStory should be an array. The value is ${listStory}`);
    }

    const storyContainer = document.querySelector('#story-container');
    if (!listStory.length) {
      storyContainer.innerHTML = this._templateEmptyStory();
      return;
    }

    storyContainer.innerHTML = '';
    listStory.forEach((story, index) => {
      const storyElement = document.createElement('story-item');
      storyElement.id = story.id;
      storyElement.name = story.name;
      storyElement.description = story.description;
      storyElement.photoUrl = story.photoUrl;
      storyElement.createdAt = new Date(story.createdAt).toLocaleDateString();
      storyElement.classes = index % 2 === 0 ? 'mb-3' : '';

      storyContainer.appendChild(storyElement);
    });
  },

  _templateEmptyStory() {
    return `
      <div class="text-center mt-5">
        <h5>No stories available</h5>
        <p>Please check back later.</p>
      </div>
    `;
  },
};

export default Home;
