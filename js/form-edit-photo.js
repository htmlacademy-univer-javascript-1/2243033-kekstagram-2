const formEditPhoto = document.querySelector('.img-upload');
const controlUploadFile = formEditPhoto.querySelector('#upload-file');
const elementImgUpload = formEditPhoto.querySelector('.img-upload__overlay');
const buttonCloseEditPhoto = formEditPhoto.querySelector('#upload-cancel');

const PopupEscKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditPhoto();
  }
};
function openEditPhoto ()  {
  elementImgUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', PopupEscKeydownHandler);
}

function closeEditPhoto () {
  elementImgUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', PopupEscKeydownHandler);
  controlUploadFile.value = '';
}

controlUploadFile.addEventListener('change', openEditPhoto);

buttonCloseEditPhoto.addEventListener('click', closeEditPhoto);


const pristine = new Pristine(formEditPhoto, {
  classTo: 'social__footer',
  errorTextParent: 'setup-wizard-form__element',
  errorTextClass: 'setup-wizard-form__error-text',
});


formEditPhoto.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    formEditPhoto.submit();
  }
});
