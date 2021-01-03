import { addTime, getTimeDiff, processDateTime } from '../../function/_date-fns';

const toClassNamesObj = (...lastNames) => {
  return lastNames.reduce(
    (acc, lastName) =>
      Object.defineProperty(acc, lastName, { value: `post-list__item__${lastName}` }),
    {}
  );
};

const processToElems = (boardName, dataObj) => {
  const itemName = 'item';
  const propNames = ['number', 'title', 'writer', 'hit', 'createdAt'];
  const classes = toClassNamesObj(...propNames);

  const _addTime = addTime;
  const _processDateTime = processDateTime;
  const _getTimeDiff = getTimeDiff;

  const postitems = dataObj.reduce((acc, post) => {
    const item = document.createElement('a');
    item.setAttribute('class', `post-list__${itemName}`);
    item.setAttribute('href', `/${boardName}/${post.id}`);

    const KST = _addTime(post.createdAt, 9); // 🌟 GMT => KST 🌟
    const timeDiff = _getTimeDiff(post.createdAt);
    const timeText = _processDateTime(KST, timeDiff);

    item.innerHTML = `
<p class=${classes.number}>${post.id || '0000'}</p>
<p class=${classes.title}>${post.title || '[ 빈 제목입니다 ]'}</p>
<p class=${classes.writer}>${post.UserId || 'Annonymous'}</p>
<p class=${classes.hit}>${post.Inquiries[0].count || '0'}</p>
<p class=${classes.createdAt}>${timeText}</p>
`.trim();

    acc.push(item);

    return acc;
  }, []);

  const DOMfragement = new DocumentFragment();
  DOMfragement.append(...postitems);

  return DOMfragement;
};

export default processToElems;
