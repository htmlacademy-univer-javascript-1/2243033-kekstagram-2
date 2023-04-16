import {renderFullSizePhoto} from './full-size-photo.js';
const containerForPictures = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('a');
const containerFragment = document.createDocumentFragment();

const similarTopicsCallback = (topic) => {
  const topicElement = similarPhotoTemplate.cloneNode(true);
  topicElement.querySelector('img').src = topic.url;
  topicElement.querySelector('.picture__likes').textContent = topic.likes;
  topicElement.querySelector('.picture__comments').textContent = topic.comments.length;
  topicElement.addEventListener('click', () => {
    renderFullSizePhoto(topic.url, topic.description, topic.likes, topic.comments);
    document.body.classList.add('modal-open');
  });
  containerFragment.appendChild(topicElement);
};

export {similarTopicsCallback, containerForPictures, containerFragment};
