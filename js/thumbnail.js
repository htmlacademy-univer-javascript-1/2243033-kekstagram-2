import {similarTopics} from './data.js';
import {createFullSizePhoto} from './fullSizePhoto.js';
const containerForPictures = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('a');
const containerFragment = document.createDocumentFragment();
similarTopics.forEach((topic) => {
  const topicElement = similarPhotoTemplate.cloneNode(true);
  topicElement.querySelector('img').src = topic.url;
  topicElement.querySelector('.picture__likes').textContent = topic.likes;
  topicElement.querySelector('.picture__comments').textContent = topic.comments.length;
  topicElement.addEventListener('click', () => {
    createFullSizePhoto(topic.url, topic.description, topic.likes, topic.comments);
    document.body.classList.add('modal-open');
  });
  containerFragment.appendChild(topicElement);
});
containerForPictures.appendChild(containerFragment);
