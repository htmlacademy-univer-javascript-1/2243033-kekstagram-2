import {getRandomArrayElement, getRandomNum} from './util.js';

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
  'Синий голенасто',
  'Тамара Витальевна',
];
const createComment = () => ({
  id: getRandomNum(0, 99), /* далее от него рандомно + 0-5*/
  avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});
const createTopic = () => {
  const comments = Array.from({length: getRandomNum(1, 4)}, createComment);
  comments.forEach((comment, index) => {
    if (index > 0) {/*  первый рандомный ид, далее рандомно от него + 1-5*/
      comment.id = comments[index - 1].id + getRandomNum(1, 5);
    }
  });
  return {
    id: 1 /*от 1 до 25 */,
    url: 'dfgkjdfjkdfgkj',
    description: 'фотография 9х12, с наивной подписью на память',
    likes: getRandomNum(15, 200),
    comments: comments
  };
};

const similarTopics = Array.from({length: TOPIC_COUNT}, createTopic);
similarTopics.forEach((item, index) => {
  item.id = index + 1;
  item.url = `photos/${index + 1}.jpg`;
});

export {similarTopics};
