/* Create Temporary Text */
// import { setFakeData } from '../__dev/bear';
// document.addEventListener('DOMContentLoaded', setFakeData, false);
// document.addEventListener('DOMContentLoaded', () => setPostList(url), false);
/* --------------------- */
/* Module */
import { getFormatDate } from '../../common/function/_getFormatDate';

/* Constant */
const NOTICE_LIMIT = 5;
const POST_LIMIT = 15;

/* Variables */
// let currentPage = 1; // 페이지 네이션을 위한 현재 페이지를 가리키는 전역 변수

/* Function */
const processToElems = (category, data) => {
  const propNames = ['number', 'title', 'writer', 'hit', 'reg-time'];
  const classes = ['item', ...propNames].reduce(
    (acc, prop) =>
      Object.defineProperty(acc, prop, {
        value: `post-list__${category}__${prop}`,
      }),
    {}
  );

  const setTimeText = (updatedAt) => {
    const today = getFormatDate(new Date());
    const regDate = getFormatDate(updatedAt);

    const timeText =
      today === regDate // 글을 쓴 날짜가 오늘이면
        ? updatedAt.match(/(?<=T).*(?=\.)/)[0] // 시간을 세팅
        : regDate; // 아니라면 날짜를 세팅

    return timeText;
  };

  for (const props of data) {
    const setTime = setTimeText;

    props.updatedAt = setTime(props.updatedAt);
  }

  const fragment = new DocumentFragment();

  for (const props of data) {
    const item = document.createElement('div');
    item.setAttribute('class', `post-list__item ${classes.item}`);

    item.innerHTML = `
    <div class=${classes.number}>${props.number || '0000'}</div>
    <a class=${classes.title} href='#'>${props.title || '[ 빈 제목입니다 ]'}</a>
    <div class=${classes.writer}>${props.writer || 'Annonymous'}</div>
    <div class=${classes.hit}>${props.hit || '000'}</div>
    <div class=${classes['reg-time']}>${props.updatedAt || '0000-00-00'}</div>
  `.trim();

    fragment.appendChild(item);
  }

  return fragment;
};

const getDataJson = (url = '') => {
  return fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    // mode: process.env.DEV_MODE === 'development' ? 'no-cors' : 'same-origin',
    // credentials: process.env.DEV_MODE === 'development' ? 'same-origin' : 'include', // 조회수 검증을 위한 쿠키 허용
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

const setBoardList = (parentElem, path, limit = 10) => {
  const url = `http://localhost:8001/${path}?limit=${limit}`;
  const category = parentElem.className.match(/(?<=__).*$/)[0];

  getDataJson(url)
    .then((res) => {
      // test
      console.log(`[ ${parentElem.className} ]\n받아온 데이터 개수 => ${res.length}`);
      return res;
    })
    .then((data) => processToElems(category, data))
    .then((fragment) => parentElem.appendChild(fragment))
    .catch(console.error);
};

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const notice = document.querySelector('.post-list__notice');
    const post = document.querySelector('.post-list__post');

    setBoardList(notice, 'announcement', NOTICE_LIMIT);
    setBoardList(post, 'community', POST_LIMIT);
  },
  false
);
