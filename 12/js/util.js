const ALERT_SHOW_TIME = 5000;
const submitButton = document.querySelector('.img-upload__submit');
const getRandomNumber = (from, to) => {
  if (typeof from !== 'number' || typeof to !== 'number' || from < 0 || to < 0) {
    return ('Ожидаю введения неотрицательных чисел');
  }
  if (from === to) {
    return from;
  }
  if (from > to) {
    [from, to] = [to, from];
  }
  return Math.floor(Math.random() * (to + 1 - from)) + from;
};

const getRandomElementOfArray = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isShort = (checkedString, maxLength) => {
  checkedString = String(checkedString);
  if (typeof maxLength !== 'number' || maxLength < 0) {
    return ('Вторым параметром ожидаю введения неотрицательного числа - максимальную длину комментария');
  }
  return checkedString.length <= maxLength;
};

isShort();

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export {getRandomElementOfArray, getRandomNumber, showAlert, blockSubmitButton, unblockSubmitButton};
