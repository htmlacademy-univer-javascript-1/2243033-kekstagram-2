const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview');
const buttonSmallerHandler = () => {
  if (parseInt(scaleValue.value, 10) <= 25) {
    return;
  }
  scaleValue.value = `${parseInt(scaleValue.value, 10) - 25}%`;
  imageUploadPreview.querySelector('img').style.transform = `scale(${parseInt(scaleValue.value, 10)/100})`;
};

buttonSmaller.addEventListener('click', buttonSmallerHandler);

const buttonBiggerHandler = () => {
  if (parseInt(scaleValue.value, 10) >= 100) {
    return;
  }
  scaleValue.value = `${parseInt(scaleValue.value, 10) + 25}%`;
  imageUploadPreview.querySelector('img').style.transform = `scale(${parseInt(scaleValue.value, 10)/100})`;
};

buttonBigger.addEventListener('click', buttonBiggerHandler);

