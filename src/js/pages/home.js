const Home = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    try {
      const fetchListStory = await fetch('/data/list_story.json');
      const responseListStory = await fetchListStory.json();

      this._listStory = responseListStory.listStory;

      this._populateStoryDataToCard(this._listStory);
    } catch (error) {
      console.error('Failed to fetch list of stories:', error);
      const storyContainer = document.querySelector('#story-container');
      storyContainer.innerHTML = this._templateEmptyStory();
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

  _templateStoryItem(index, story) {
    return `
      <story-item
        id="${story.id}"
        name="${story.name}"
        description="${story.description}"
        photoUrl="${story.photoUrl}"
        createdAt="${new Date(story.createdAt).toLocaleDateString()}"
        classes="${index % 2 === 0 ? 'mb-3' : ''}">
      </story-item>
    `;
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
