const addTime = (dateTime, hours) => {
  const oldTime = new Date(dateTime);
  const newTime = new Date();

  newTime.setTime(oldTime.getTime() + hours * 60 * 60 * 1000);

  return newTime;
};

const getTimeDiff = (dateTime) => {
  const oldTime = new Date(dateTime);
  const newTime = new Date();

  return newTime.getTime() - oldTime.getTime();
};

const mmdd = (dateObj) => {
  // [Date Object] => String 'mm-dd', example - '12-25'
  // Non-capture Elements
  return dateObj.toISOString().match(/(?<=^\d{2,4}-)\d+-\d+(?=T)/)[0];
};

const formatDistance = (ms) => {
  if (ms > 1000 * 60 * 60 * 24) return undefined;

  // [Date Object] => [formatted time distance], example - '10초 전', '2분 전', '5시간 전' etc..
  const distanceMsg = {
    hours(hDiff) {
      return `${hDiff}시간 전`;
    },
    minutes(mDiff) {
      return `${mDiff}분 전`;
    },
    seconds(sDiff) {
      return `${sDiff}초 전`;
    },
  };

  const ss = Math.floor((ms / 1000) % 60);
  const mm = Math.floor((ms / 1000 / 60) % 60);
  const hh = Math.floor(ms / 1000 / 60 / 60);

  // (1시간~23시간) 이전
  if (hh >= 1) {
    return distanceMsg.hours(hh);
  } // (1분 ~ 59분) 이전
  else if (mm >= 1) {
    return distanceMsg.minutes(mm);
  } // (1초 ~ 59초) 이전
  else if (ss >= 0) {
    return distanceMsg.seconds(ss);
  }
};

const processDateTime = (dateTime, diff) => {
  const today = mmdd(new Date());
  const date = mmdd(dateTime);
  const timeDistance = formatDistance(diff);

  const timeText = date === today ? timeDistance : date;

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
  const propNames = ['number', 'title', 'writer', 'hit', 'createdAt'];
  const classes = toClassNamesObj(...propNames);

  const _addTime = addTime;
  const _processDateTime = processDateTime;
  const _getTimeDiff = getTimeDiff;

  const postitems = dataObj.reduce((acc, post) => {
    const item = document.createElement('div');
    item.setAttribute('class', `post-list__${itemName}`);

    const postViewLink = `/${boardName}/${post.id}`;

    const KST = _addTime(post.createdAt, 9); // 🌟 GMT => KST 🌟
    const timeDiff = _getTimeDiff(post.createdAt);
    const timeText = _processDateTime(KST, timeDiff);

    item.innerHTML = `
<div class=${classes.number}>${post.id || '0000'}</div>
<a class=${classes.title} href=${postViewLink}>${post.title || '[ 빈 제목입니다 ]'}</a>
<div class=${classes.writer}>${post.UserId || 'Annonymous'}</div>
<div class=${classes.hit}>${post.Inquiries[0].count || '0'}</div>
<div class=${classes.createdAt}>${timeText}</div>
`.trim();

    acc.push(item);

    return acc;
  }, []);

  const DOMfragement = new DocumentFragment();
  DOMfragement.append(...postitems);

  return DOMfragement;
};

export default processToElems;
