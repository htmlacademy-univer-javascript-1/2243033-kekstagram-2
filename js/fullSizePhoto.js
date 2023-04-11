const createFullSizePhoto = (url, description, likes, comments) => {
  // eslint-disable-next-line no-shadow
  const fullSizeView = document.querySelector('.big-picture');
  fullSizeView.classList.remove('hidden');
  const fullSizePhoto = fullSizeView.querySelector('.big-picture__img');
  fullSizePhoto.querySelector('img').src = url;
  const fullSizePhotoSocial = fullSizeView.querySelector('.big-picture__social');
  fullSizePhotoSocial.querySelector('.likes-count').textContent = likes;
  fullSizePhotoSocial.querySelector('.comments-count').textContent = comments.length;
  fullSizePhotoSocial.querySelector('.social__caption').textContent = description;
  const commentsList = fullSizeView.querySelector('.social__comments');
  commentsList.textContent = '';
  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `<img className="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"> <p className="social__text">${comment.message}</p>`;
    commentsList.appendChild(commentElement);
  });
  commentsList.appendChild(comments);
  return fullSizeView;
};
const fullSizeView = document.querySelector('.big-picture');
const buttonCloseFullSizePhoto = fullSizeView.querySelector('.big-picture__cancel');
fullSizeView.querySelector('.social__comment-count').classList.add('hidden');
fullSizeView.querySelector('.comments-loader').classList.add('hidden');
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
export {createFullSizePhoto};
