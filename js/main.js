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

// eslint-disable-next-line no-unused-vars
const isShort = (checkedString, maxLength) => {
  checkedString = String(checkedString);
  if (typeof maxLength !== 'number' || maxLength < 0) {
    return ('Вторым параметром ожидаю введения неотрицательного числа - максимальную длину комментария');
  }
  return checkedString.length <= maxLength;
};

const TOPIC_COUNT = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Евпатий',
  'Гаврила',
  'Черная мышь',
  'Амфибрахий',
  'Синий голеностоп',
  'Тамара Витальевна',
];
const getRandomArrayElement = (elements) => elements[getRandomNum(0, elements.length - 1)];

const createComment = () => ({
  id: getRandomNum(0, 99), /* далее от него рандомно + 0-5*/
  avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const createTopic = () => ({
  // eslint-disable-next-line no-use-before-define
  id: 'будет изменено' /*от 1 до 25 */,
  url: 'будет изменено',
  description: 'фотография 9х12, с наивной подписью на память',
  likes: getRandomNum(15, 200),
  comments: createComment(),
});
const similarTopics = Array.from({length: TOPIC_COUNT}, createTopic);
similarTopics.forEach((item, index) => {
  item.id = index + 1;
  item.url = `photos/${index + 1}.jpg`;
  // item.comments = Array.from({length: getRandomNum(1, 4)}, createComment);
  if (index>0) {/*  первый рандомный ид, далее рандомно от него + 0-5*/
    item.comments.id = similarTopics[index-1].comments.id + getRandomNum(0, 5);
  }
});
// eslint-disable-next-line no-console
console.log(similarTopics);

