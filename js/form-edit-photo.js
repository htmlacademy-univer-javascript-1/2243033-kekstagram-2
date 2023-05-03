const formEditPhoto = document.querySelector('.img-upload');
const controlUploadFile = formEditPhoto.querySelector('#upload-file');
const elementImgUpload = formEditPhoto.querySelector('.img-upload__overlay');
const buttonCloseEditPhoto = formEditPhoto.querySelector('#upload-cancel');
const hashtagsField = formEditPhoto.querySelector('.text__hashtags');
const commentField = formEditPhoto.querySelector('.text__description');
const remaining = formEditPhoto.querySelector('.remaining');

const popupEscKeydownHandler = (evt) => {
  if (evt.key === 'Escape' && hashtagsField !== document.activeElement && commentField !== document.activeElement) {
    evt.preventDefault();
    closeEditPhotoHandler();
  }
};
function closeEditPhotoHandler() {
  elementImgUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', popupEscKeydownHandler);
  controlUploadFile.value = '';
}
const openEditPhotoHandler = () => {
  elementImgUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', popupEscKeydownHandler);
};

controlUploadFile.addEventListener('change', openEditPhotoHandler);

buttonCloseEditPhoto.addEventListener('click', closeEditPhotoHandler);


const pristine = new Pristine(formEditPhoto, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error',
});

function validateHashtagsDouble(value) {
  const hashtags = value.toLowerCase().trim().split(' ');
  return new Set(hashtags).size === hashtags.length;
}
pristine.addValidator(hashtagsField, validateHashtagsDouble, 'Хэштеги не должны повторяться', 3, false);

function validateHashtagsQuantity(value) {
  const hashtags = value.trim().split(' ');
  return hashtags.length <= 5;
}
pristine.addValidator(hashtagsField, validateHashtagsQuantity, 'Хэштегов должно быть не более 5', 1, false);
function validateHashtagsRe (value) {
  const hashtags = value.trim().split(' ');
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return hashtags.every((hashtag) => {
    hashtag.trim();
    return re.test(hashtag);
  });
}
pristine.addValidator(hashtagsField, validateHashtagsRe, 'Хэштег должен начинаться с #, быть от 2 до 20 символов и не может содержать спецсимволы', 2, false);

formEditPhoto.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    formEditPhoto.querySelector('.img-upload__form').submit();
  }
});

commentField.addEventListener('keydown', () => {
  remaining.textContent = `осталось символов: ${140-formEditPhoto.querySelector('textarea').value.length}`;
});
