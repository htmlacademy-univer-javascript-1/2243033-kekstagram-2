import {renderFullSizePhoto} from './full-size-photo.js';
const containerForPictures = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('a');
const containerFragment = document.createDocumentFragment();

const createSimilarClonedTopics = (topic) => {
  const {url, likes, comments, description} = topic;
  const topicElement = similarPhotoTemplate.cloneNode(true);
  topicElement.querySelector('img').src = url;
  topicElement.querySelector('.picture__likes').textContent = likes;
  topicElement.querySelector('.picture__comments').textContent = comments.length;
  topicElement.addEventListener('click', () => {
    renderFullSizePhoto(url, description, likes, comments);
    document.body.classList.add('modal-open');
  });
  containerFragment.appendChild(topicElement);
};
const renderThumbnails = (similarTopics) => {
  similarTopics.forEach((topic) => {createSimilarClonedTopics(topic);});
  containerForPictures.appendChild(containerFragment);
};

export {renderThumbnails};
