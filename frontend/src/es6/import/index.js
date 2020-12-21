// function
import requestURL from '../common/post/postList/_requestURL';
import defaultFetch from '../common/post/postList/_defaultFetch';
import { addTime, getTimeDiff, processDateTime } from '../common/function/_date-fns';

const processToElems = (boardName, dataObj) => {
  const _addTime = addTime;
  const _processDateTime = processDateTime;
  const _getTimeDiff = getTimeDiff;

  const ul = document.createElement('ul');
  ul.classList.add('index-main__first-box__list');

  const postitems = dataObj.reduce((acc, post) => {
    const titleText = post.title;
    const postViewLink = `/${boardName}/${post.id}`;

    const KST = _addTime(post.createdAt, 9); // 🌟 GMT => KST 🌟
    const timeDiff = _getTimeDiff(post.createdAt);
    const timeText = _processDateTime(KST, timeDiff);

    const li = document.createElement('li');
    li.classList.add('index-main__first-box__item');

    const a = document.createElement('a');
    a.classList.add('index-main__first-box__link');
    a.href = postViewLink;
    a.textContent = titleText;

    li.appendChild(a);

    const span = document.createElement('span');
    span.classList.add('index-main__first-box__time-txt');
    span.textContent = timeText;

    li.appendChild(span);

    acc.push(li);

    return acc;
  }, []);

  ul.append(...postitems);

  const DOMfragement = new DocumentFragment();
  DOMfragement.append(ul);

  return DOMfragement;
};

const getPostList = (parentElem, boardName, limit = 5, page = 1) => {
  const path = `/${boardName}/api?limit=${limit}&page=${page}`;

  requestURL.path = path;

  // test
  const testLog = (res) => {
    if (process.env.NODE_ENV !== 'development') return res;

    console.log(`요청 API => ${path}`);

    return res;
  };

  return defaultFetch(requestURL.url)
    .then((res) => testLog(res) /* Just log => data not change */)
    .then((res) => processToElems(boardName, res.postsList))
    .then((DOMfragment) => parentElem.appendChild(DOMfragment))
    .catch(console.error);
};

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const notice = document.querySelector('.index-main__notice');
    const board = document.querySelector('.index-main__board');
    const donation = document.querySelector('.index-main__donation');

    // 공지사항 데이터 fetch로 가져와 출력하기
    getPostList(notice, 'community/notice', 5);

    // 학과 이야기 데이터 fetch로 가져와 출력하기
    getPostList(board, 'community/board', 5);

    // 학과 이야기 데이터 fetch로 가져와 출력하기
    getPostList(donation, 'community/donation', 5);
  },
  false
);

// component
