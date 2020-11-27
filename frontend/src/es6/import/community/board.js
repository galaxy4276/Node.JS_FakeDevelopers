/* Create Temporary Text */
// import { setFakeData } from '../__dev/bear';
// document.addEventListener('DOMContentLoaded', setFakeData, false);
// document.addEventListener('DOMContentLoaded', () => setPostList(url), false);
/* --------------------- */

/* Constant */
const NOTICE_LIMIT = 5;
const POST_LIMIT = 15;

/* Variables */
// let currentPage = 1;

/* Function */
const processToElems = (category, obj) => {
  const props = ['number', 'title', 'writer', 'hit', 'reg-date'];
  const classes = props.reduce(
    (acc, prop) => Object.defineProperty(acc, prop, { value: `post-list__${category}__${prop}` }),
    {}
  );
  console.log(classes);
  console.log(obj);
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
      console.log(`받아온 데이터 개수 => ${res.length}`);
      return res;
    })
    .then((json) => JSON.stringify(json))
    .then((dataObj) => processToElems(category, dataObj))
    .then((elems) => elems.map((elem) => parentElem.appendChild(elem)))
    .catch(console.error);
};

document.addEventListener(
  'DOMContentLoaded',
  () => {
    // const notice = document.querySelector('.post-list__notice');
    const post = document.querySelector('.post-list__post');

    // setBoardList(notice, 'announcement', NOTICE_LIMIT);
    setBoardList(post, 'community', POST_LIMIT);
  },
  false
);
