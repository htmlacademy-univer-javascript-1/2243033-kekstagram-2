/** @module form-edit-photo */
import './scale-photo.js';
import './effects.js';
import {blockSubmitButton, unblockSubmitButton, showAlert} from './util.js';
import {sendData} from './api.js';
const HASHTAGS_QUANTITY = 5;
const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const formEditPhoto = document.querySelector('.img-upload');
const controlUploadFile = formEditPhoto.querySelector('#upload-file');
const elementImgUpload = formEditPhoto.querySelector('.img-upload__overlay');
const buttonCloseEditPhoto = formEditPhoto.querySelector('#upload-cancel');
const hashtagsField = formEditPhoto.querySelector('.text__hashtags');
const commentField = formEditPhoto.querySelector('.text__description');
const remaining = formEditPhoto.querySelector('.remaining');
const successLoadTemplate = document.querySelector('#success').content.querySelector('section');
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
/**
 * создание экземпляра пристин
 * @type {Pristine} библиотека для валидации форм
 */

const pristine = new Pristine(formEditPhoto, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error',
});

/**
 * проверка на появление дублей хэштегов
 * @param {string} value введенные хэштеги
 * @returns {boolean} истинно если нет дублей
 */
function validateHashtagsDouble(value) {
  const hashtags = value.toLowerCase().trim().split(' ');
  return new Set(hashtags).size === hashtags.length;
}
pristine.addValidator(hashtagsField, validateHashtagsDouble, 'Хэштеги не должны повторяться', 3, false);

/**
 * проверка на количество хэштегов
 * @param {string} value введенные хэштеги
 * @returns {boolean} истинно если количество хэштегов не больше заданного
 */
function validateHashtagsQuantity(value) {
  const hashtags = value.trim().split(' ');
  return hashtags.length <= HASHTAGS_QUANTITY;
}
pristine.addValidator(hashtagsField, validateHashtagsQuantity, `Хэштегов должно быть не более ${HASHTAGS_QUANTITY}`, 1, false);

/**
 * проверка хэштегов на соотвествие регулярке
 * @param value {string} введенные хэштеги
 * @returns {boolean} истинно если каждый хэштег подходит под заданную регулярку
 */
function validateHashtagsRe (value) {
  if (value.length > 1) {
    const hashtags = value.trim().split(' ');
    return hashtags.every((hashtag) => {
      hashtag.trim();
      return RE.test(hashtag);
    });
  } else {
    return true;
  }
}
pristine.addValidator(hashtagsField, validateHashtagsRe, 'Хэштег должен начинаться с #, быть от 2 до 20 символов и не может содержать спецсимволы', 2, false);

const setFormEditPhotoSubmit =(onSuccess) => {
  formEditPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          closeEditPhotoHandler();
          const message = successLoadTemplate.cloneNode(true);
          document.body.append(message);
          const buttonSuccessClose = message.querySelector('.success__button');
          buttonSuccessClose.addEventListener('click', () => {
            document.body.removeChild(message);
          });
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),);
    }
  });
};

commentField.addEventListener('keydown', () => {
  remaining.textContent = `осталось символов: ${140-formEditPhoto.querySelector('textarea').value.length}`;
});

export {setFormEditPhotoSubmit};
