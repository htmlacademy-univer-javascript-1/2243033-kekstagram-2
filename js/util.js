const getRandomNum = (from, to) => {
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

const getRandomArrayElement = (elements) => elements[getRandomNum(0, elements.length - 1)];

const isShort = (checkedString, maxLength) => {
  checkedString = String(checkedString);
  if (typeof maxLength !== 'number' || maxLength < 0) {
    return ('Вторым параметром ожидаю введения неотрицательного числа - максимальную длину комментария');
  }
  return checkedString.length <= maxLength;
};

isShort();
export {getRandomArrayElement, getRandomNum};
