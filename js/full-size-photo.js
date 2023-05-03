const fullSizeView = document.querySelector('.big-picture');
const fullSizePhoto = fullSizeView.querySelector('.big-picture__img');
const fullSizePhotoSocial = fullSizeView.querySelector('.big-picture__social');
const buttonCommentsLoader = fullSizeView.querySelector('.comments-loader');
const containerForComments = document.querySelector('.social__comments');
const similarCommentTemplate = containerForComments.querySelector('.social__comment');
const containerForCommentsFragment = document.createDocumentFragment();

const isCommentOff = (comments) => {
  if (fullSizeView.getElementsByClassName('social__comment')[comments.length-1].className.split(' ').indexOf('hidden') >= 0) {
    buttonCommentsLoader.classList.remove('hidden');
  } else {
    buttonCommentsLoader.classList.add('hidden');
  }
};

const buttonCommentsLoaderClickHandler = () => {
  Array.from(document.querySelectorAll('.social__comments .hidden')).forEach((el, ndx) => {
    if (ndx <=4) {
      el.classList.remove('hidden');
    }
  });
  buttonCommentsLoader.classList.add('hidden');
  if (fullSizeView.querySelector('.social__comments .hidden')) {
    buttonCommentsLoader.classList.remove('hidden');
  }
  fullSizePhotoSocial.querySelector('.social__comment-count').innerHTML = `${Array.from(document.querySelectorAll('.social__comment')).length - Array.from(document.querySelectorAll('.social__comments .hidden')).length} из <span class="comments-count">${Array.from(document.querySelectorAll('.social__comment')).length}</span> комментариев`;
};
const renderFullSizePhoto = (url, description, likes, comments) => {
  fullSizeView.classList.remove('hidden');
  fullSizePhoto.querySelector('img').src = url;
  fullSizePhotoSocial.querySelector('.likes-count').textContent = likes;
  fullSizePhotoSocial.querySelector('.social__comment-count').innerHTML = `${Math.min(5, comments.length)} из <span class="comments-count">${comments.length}</span> комментариев`;
  fullSizePhotoSocial.querySelector('.social__caption').textContent = description;
  const commentsList = fullSizeView.querySelector('.social__comments');
  commentsList.textContent = '';
  comments.forEach((comment, index) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"> <p class="social__text">${comment.message}</p>`;
    if (index >= 5) {
      commentElement.classList.add('hidden');
    }
    commentsList.appendChild(commentElement);
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

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    fullSizeView.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});
buttonCloseFullSizePhoto.addEventListener('click', () => {
  fullSizeView.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

export {renderFullSizePhoto};
