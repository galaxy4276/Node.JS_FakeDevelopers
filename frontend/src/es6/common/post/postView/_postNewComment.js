import guideAsPlaceholder from '../../function/_guideAsPlaceholder';
import { addTime, yymmdd, hhmm } from '../../function/_date-fns';

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

  const commentItem = document.createElement('li');
  commentItem.classList.add(`post-view__comment__${itemName}`);

  const KST = addTime(commentInfo.createdAt, 9); // 🌟 GMT => KST 🌟
  const createdDate = yymmdd(KST);
  const createdTime = hhmm(KST);

  commentItem.innerHTML =
    `
<section class="${classes.info}">
  <span>${commentInfo.UserId}</span>
`.trim() +
    `
  <span>${createdDate}</span>
  <span>${createdTime}</span>
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

const postNewComment = async () => {
  const contentArea = document.querySelector('.post-view__comment__textarea');

  if (contentArea.value === '') {
    guideAsPlaceholder(contentArea, '빈 댓글은 제출할 수 없습니다.');
    return;
  }

  const content = contentArea.value;
  const reqUrl = `${document.URL}/comment`;

  // test
  const testLog = (res) => {
    if (process.env.NODE_ENV !== 'development') return res;

    console.log(`요청 API => ${reqUrl}`);
    console.log(res);

    return res;
  };

  await commentFetch(reqUrl, content)
    .then((res) => testLog(res) /* Just log => data not change */)
    .then((commentInfo) => processToElem(commentInfo))
    .then((commentElem) => addToCommentList(commentElem))
    .catch(console.error);

  contentArea.value = '';
  contentArea.placeholder = '소중한 댓글 하나하나가 글 작성자에게 큰 힘이 됩니다.';
};

export default postNewComment;
