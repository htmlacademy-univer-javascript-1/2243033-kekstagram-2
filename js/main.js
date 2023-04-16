import {createSimilarTopics} from './data.js';
import {similarTopicsCallback, containerForPictures, containerFragment} from './thumbnail.js';

const similarTopic = createSimilarTopics();
similarTopic.forEach((topic) => {similarTopicsCallback(topic);});
containerForPictures.appendChild(containerFragment);
