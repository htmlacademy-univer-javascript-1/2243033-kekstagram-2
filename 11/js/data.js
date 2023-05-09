/** @module data */
import {getRandomElementOfArray, getRandomNumber} from './util.js';

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
  id: getRandomNumber(0, 99), /* далее от него рандомно + 0-5*/
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomElementOfArray(MESSAGES),
  name: getRandomElementOfArray(NAMES),
});
const createTopic = (index) => {
  const comments = Array.from({length: getRandomNumber(1, 14)}, createComment);
  comments.forEach((comment, ndx) => {
    if (ndx > 0) {/*  первый рандомный ид, далее рандомно от него + 1-5*/
      comment.id = comments[ndx - 1].id + getRandomNumber(1, 5);
    }
  });
  return {
    id: index + 1 /*от 1 до 25 */,
    url: `photos/${index + 1}.jpg`,
    description: 'фотография 9х12, с наивной подписью на память',
    likes: getRandomNumber(15, 200),
    comments: comments
  };
};
const createSimilarTopics = (cnt) => Array.from({length: cnt}, (_, i) => createTopic(i));
export {createSimilarTopics};
