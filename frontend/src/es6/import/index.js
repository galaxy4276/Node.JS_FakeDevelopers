// function
import requestURL from '../common/post/postList/_requestURL';
import defaultFetch from '../common/post/postList/_defaultFetch';
import { getFormatDate } from '../common/function/_getFormatDate';

const setTimeText = (createdAt) => {
  const today = getFormatDate(new Date());
  const regDate = getFormatDate(createdAt);

  const timeText =
    today === regDate // 글을 쓴 날짜가 오늘이면
      ? createdAt.match(/(?<=T).*(?=\.)/)[0] // 시간을 세팅
      : regDate.match(/(?<=\d{4}-).*/)[0]; // 아니라면 날짜를 세팅

  return timeText;
};

const processToElems = (boardName, dataObj) => {
  const setTime = setTimeText;

  const ul = document.createElement('ul');
  ul.classList.add('index-main__first__list');

  const postitems = dataObj.reduce((acc, post) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const span = document.createElement('span');
    const titleText = post.title;
    const dateText = setTime(post.createdAt);
    const postViewLink = `/${boardName}/${post.id}`;
    a.href = postViewLink;
    a.textContent = titleText;
    span.textContent = dateText;
    li.appendChild(a);
    a.classList.add('index-main__first__link');
    li.appendChild(span);
    li.classList.add('index-main__first__item');

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
    if (process.env.NODE_ENV !== 'development') return;

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
    const news = document.querySelector('.index-main__department-news');

    // 공지사항 데이터 fetch로 가져와 출력하기
    getPostList(notice, 'community/notice', 5);

    // 학과 이야기 데이터 fetch로 가져와 출력하기
    getPostList(news, 'community/board', 5);
  },
  false
);

// component
