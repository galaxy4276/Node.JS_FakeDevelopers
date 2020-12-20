const setTimeText = (createdAt) => {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
  const nowDay = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate();
  const today = `${nowYear}-${nowMonth}-${nowDay}`;

  const createdInfos = createdAt.match(/(^\d+-\d+-\d+)(?:T)(\d+:\d+:\d+)(?=.000Z$)/);
  const createdDate = createdInfos[1];
  const createdTime = createdInfos[2];

  if (process.env.NODE_ENV === 'development') {
    console.log(`res.createdAt => ${createdAt}`);
    console.log(`today => ${today}`);
    console.log(`createdDate => ${createdDate}`);
    console.log(`createdTime => ${createdTime}`);
    console.log(`---------------------------------`);
  }

  const timeText = createdDate === today ? createdTime : createdDate;

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

  const setTime = setTimeText;

  const postitems = dataObj.reduce((acc, post) => {
    const item = document.createElement('div');
    item.setAttribute('class', `post-list__${itemName}`);

    const postViewLink = `/${boardName}/${post.id}`;

    item.innerHTML = `
<div class=${classes.number}>${post.id || '0000'}</div>
<a class=${classes.title} href=${postViewLink}>${post.title || '[ 빈 제목입니다 ]'}</a>
<div class=${classes.writer}>${post.UserId || 'Annonymous'}</div>
<div class=${classes.hit}>${post.Inquiries[0].count || '0'}</div>
<div class=${classes.createdAt}>${setTime(post.createdAt) || '0000-00-00'}</div>
`.trim();

    acc.push(item);

    return acc;
  }, []);

  const DOMfragement = new DocumentFragment();
  DOMfragement.append(...postitems);

  return DOMfragement;
};

export default processToElems;
