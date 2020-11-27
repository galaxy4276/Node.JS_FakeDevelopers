/* Create Temporary Text */
// import { setFakeData } from '../__dev/bear';
// document.addEventListener('DOMContentLoaded', setFakeData, false);
// document.addEventListener('DOMContentLoaded', () => setPostList(url), false);
/* --------------------- */
/* Variables */
const LIMIT = 15;
// let currentPage = 1;

/* Function */
const getPostList = (url = '') => {
  return fetch(url, {
    method: 'GET',
    // mode: process.env.DEV_MODE === 'development' ? 'no-cors' : 'same-origin',
    // credentials: process.env.DEV_MODE === 'development' ? 'same-origin' : 'include', // 조회수 검증을 위한 쿠키 허용
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

const setPostList = () => {
  console.log(`요청 url => http://localhost:8001/community?limit=${LIMIT}&page=1`); //test

  getPostList(`http://localhost:8001/community?limit=${LIMIT}`)
    .then((res) => {
      // test
      console.log(`받아온 데이터 개수 => ${res.length}`);
      return res;
    })
    .then((data) => JSON.stringify(data))
    .catch(console.error);
};

document.addEventListener('DOMContentLoaded', setPostList, false);
