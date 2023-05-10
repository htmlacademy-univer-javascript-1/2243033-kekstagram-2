/** @module full-size-photo */
const fullSizeView = document.querySelector('.big-picture');
const fullSizePhoto = fullSizeView.querySelector('.big-picture__img');
const fullSizePhotoSocial = fullSizeView.querySelector('.big-picture__social');
const buttonCommentsLoader = fullSizeView.querySelector('.comments-loader');
const containerForComments = document.querySelector('.social__comments');
const similarCommentTemplate = containerForComments.querySelector('.social__comment');
const QUANTITY_COMMENTS = 5;
const commentCount = fullSizePhotoSocial.querySelector('.comments-count');
const startCommentCount = fullSizePhotoSocial.querySelector('.start-comments-count');
/**
 * отключение кнопки загрузки комментов, если комменты закончились
 * @param {Array} comments комменты
 */
const isCommentOff = (comments) => {
  if (fullSizeView.getElementsByClassName('social__comment')[comments.length-1].className.split(' ').indexOf('hidden') >= 0) {
    buttonCommentsLoader.classList.remove('hidden');
  } else {
    buttonCommentsLoader.classList.add('hidden');
  }
};

const buttonCommentsLoaderClickHandler = () => {
  Array.from(fullSizeView.querySelectorAll('.social__comments .hidden')).forEach((el, ndx) => {
    if (ndx < QUANTITY_COMMENTS) {
      el.classList.remove('hidden');
    }
  });
  buttonCommentsLoader.classList.add('hidden');
  if (fullSizeView.querySelector('.social__comments .hidden')) {
    buttonCommentsLoader.classList.remove('hidden');
  }
  startCommentCount.textContent = Array.from(fullSizeView.querySelectorAll('.social__comment')).length - Array.from(fullSizeView.querySelectorAll('.social__comments .hidden')).length;
};
/**
 * отрисовка полноформатного фото с комментами
 * @param {string} url урл
 * @param {string} description описание фото
 * @param {number} likes количество лайков
 * @param {Array} comments комментарии к фотке
 * @returns {Element} нода большой картинки
 */
const renderFullSizePhoto = (url, description, likes, comments) => {
  fullSizeView.classList.remove('hidden');
  fullSizePhoto.querySelector('img').src = url;
  fullSizePhotoSocial.querySelector('.likes-count').textContent = likes;
  fullSizePhotoSocial.querySelector('.social__caption').textContent = description;
  commentCount.textContent = comments.length;
  startCommentCount.textContent = String(Math.min(QUANTITY_COMMENTS, comments.length));
  containerForComments.textContent = '';
  comments.forEach((comment, index) => {
    const commentElement = similarCommentTemplate.cloneNode(true);
    commentElement.querySelector('img').src = comment.avatar;
    commentElement.querySelector('img').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    if (index >= 5) {
      commentElement.classList.add('hidden');
    }
    containerForComments.appendChild(commentElement);
  });
  buttonCommentsLoader.addEventListener('click', buttonCommentsLoaderClickHandler);
  isCommentOff(comments);
  fullSizeView.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('big-picture')) {
      fullSizeView.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
  return fullSizeView;
};

const buttonCloseFullSizePhoto = fullSizeView.querySelector('.big-picture__cancel');

document.body.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    fullSizeView.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});
buttonCloseFullSizePhoto.addEventListener('click', closeUserModal);

function closeUserModal () {
  fullSizeView.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

export {renderFullSizePhoto, closeUserModal};
