// function
import requestURL from '../common/function/_requestURL';
import defaultFetch from '../common/function/_defaultFetch';
import { addTime, getTimeDiff, processDateTime } from '../common/function/_date-fns';

const toClassNamesObj = (...lastNames) => {
  return lastNames.reduce(
    (acc, lastName) =>
      Object.defineProperty(acc, lastName, { value: `index-main__first-box__${lastName}` }),
    {}
  );
};

const processToElems = (boardName, dataObj) => {
  const itemName = 'item';
  const propNames = ['link', 'title', 'time'];
  const classes = toClassNamesObj(...propNames);

  const _addTime = addTime;
  const _processDateTime = processDateTime;
  const _getTimeDiff = getTimeDiff;

  const ul = document.createElement('ul');
  ul.classList.add('index-main__first-box__list');

  const postitems = dataObj.reduce((acc, post) => {
    const item = document.createElement('li');
    item.setAttribute('class', `index-main__first-box__${itemName}`);

    const postViewLink = `/${boardName}/${post.id}`;

    const KST = _addTime(post.createdAt, 9); // 🌟 GMT => KST 🌟
    const timeDiff = _getTimeDiff(post.createdAt);
    const timeText = _processDateTime(KST, timeDiff);

    item.innerHTML = `
<a class="${classes.link}" href="${postViewLink}">
  <span class="${classes.title}">${post.title || '[ 빈 제목입니다 ]'}</span>
  <span class="${classes.time}">${timeText}</span>
</a>
`.trim();

    acc.push(item);

    return acc;
  }, []);

  ul.append(...postitems);

  const DOMfragement = document.createDocumentFragment();
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
    const notice = document.querySelector('.index-main__first-box--notice');
    const board = document.querySelector('.index-main__first-box--board');
    const donation = document.querySelector('.index-main__first-box--donation');

    // 공지사항 데이터 fetch로 가져와 출력하기
    getPostList(notice, 'community/notice', 5);

    // 학과 이야기 데이터 fetch로 가져와 출력하기
    getPostList(board, 'community/board', 5);

    // 학과 이야기 데이터 fetch로 가져와 출력하기
    getPostList(donation, 'community/donation', 5);
  },
  false
);
