import { getFormatDate } from '../../function/_getFormatDate'; // 'yyyy-mm-dd' 형식의 string을 반환하는 함수

const setTimeText = (updatedAt) => {
  const today = getFormatDate(new Date());
  const regDate = getFormatDate(updatedAt);

  const timeText =
    today === regDate // 글을 쓴 날짜가 오늘이면
      ? updatedAt.match(/(?<=T).*(?=\.)/)[0] // 시간을 세팅
      : regDate; // 아니라면 날짜를 세팅

  return timeText;
};

const toClassNamesObj = (...lastNames) => {
  return lastNames.reduce(
    (acc, lastName) =>
      Object.defineProperty(acc, lastName, { value: `post-list__item__${lastName}` }),
    {}
  );
};

const processToElems = (boardName, dataObj) => {
  const itemName = 'item';
  const propNames = ['number', 'title', 'writer', 'hit', 'reg-time'];
  const classes = toClassNamesObj(...propNames);

  const setTime = setTimeText;

  const postitems = dataObj.reduce((acc, post) => {
    const item = document.createElement('div');
    item.setAttribute('class', `post-list__${itemName}`);

    const postViewLink = `/${boardName}/${post.id}`;

    item.innerHTML = `
    <div class=${classes.number}>${post.id || '0000'}</div>
    <a class=${classes.title} href=${postViewLink}>${post.title || '[ 빈 제목입니다 ]'}</a>
    <div class=${classes.writer}>${post.UserId || 'Annonymous'}</div>
    <div class=${classes.hit}>${post.Inquiries.count || '0'}</div>
    <div class=${classes['reg-time']}>${setTime(post.createdAt) || '0000-00-00'}</div>
  `.trim();

    acc.push(item);

    return acc;
  }, []);

  const DOMfragement = new DocumentFragment();
  DOMfragement.append(...postitems);

  return DOMfragement;
};

export default processToElems;
