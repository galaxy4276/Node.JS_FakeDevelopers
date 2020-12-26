import { addTime, getTimeDiff, processDateTime } from '../../function/_date-fns';

const addToCommentList = (commentElem) => {
  const commentList = document.querySelector('.post-view__comment__list');
  const DOMfragment = document.createDocumentFragment();

  DOMfragment.append(commentElem);
  commentList.append(DOMfragment);
};

const toClassNamesObj = (...lastNames) => {
  return lastNames.reduce(
    (acc, lastName) =>
      Object.defineProperty(acc, lastName, { value: `post-view__comment__${lastName}` }),
    {}
  );
};

const processToElem = (commentInfo) => {
  const itemName = 'item';
  const propNames = ['info', 'content'];
  const classes = toClassNamesObj(...propNames);

  const commentItem = document.createElement('div');
  commentItem.classList.add(`post-view__comment__${itemName}`);

  const KST = addTime(commentInfo.createdAt, 9); // 🌟 GMT => KST 🌟
  const timeDiff = getTimeDiff(commentInfo.createdAt);
  const timeText = processDateTime(KST, timeDiff);

  commentItem.innerHTML = `
<section class="${classes.info}">
  <span>${commentInfo.UserId}</span>
  <span>${timeText}</span>
</section>
<section class="${classes.content}">${commentInfo.comment}</section>
`.trim();

  return commentItem;
};

const commentFetch = (url, content) => {
  return fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    mode: process.env.NODE_ENV === 'development' ? 'cors' : 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ data: content }),
  }).then((res) => res.json());
};

const postNewComment = () => {
  // TODO: 입력값 검증 추가
  const reqUrl = `${document.URL}/comment`;
  const content = document.querySelector('.post-view__comment__textarea').value;

  // test
  const testLog = (res) => {
    if (process.env.NODE_ENV !== 'development') return res;

    console.log(`요청 API => ${reqUrl}`);
    console.log(`작성내용 => ${content}`);
    console.log(res);

    return res;
  };

  commentFetch(reqUrl, content)
    .then((res) => testLog(res) /* Just log => data not change */)
    .then((commentInfo) => processToElem(commentInfo))
    .then((commentElem) => addToCommentList(commentElem))
    .catch(console.error);
};

export default postNewComment;
