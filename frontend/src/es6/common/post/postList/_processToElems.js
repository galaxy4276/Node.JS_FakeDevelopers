const addTime = (dateTime, hours) => {
  const oldTime = new Date(dateTime);
  const newTime = new Date();

  newTime.setTime(oldTime.getTime() + hours * 60 * 60 * 1000);

  return newTime;
};

let firstTestDone = false; // test log
const processDateTime = (dateTime) => {
  const yymmdd = (dateObj) => dateObj.toISOString().match(/(^\d+-\d+-\d+)(?=T)/)[0];
  const hhmmss = (dateObj) => dateObj.toISOString().match(/(?<=T)(\d+:\d+:\d+)(?=.000Z$)/)[0];

  const today = yymmdd(new Date());
  const date = yymmdd(dateTime);
  const time = hhmmss(dateTime);

  const timeText = date === today ? time : date;

  const testLog = () => {
    if (firstTestDone) return; // test log
    console.log(`---------------------------------`);
    console.log(`Today => ${today}`);
    console.log(`First Post Date => ${date}`);
    console.log(`First Post time => ${time}`);
    console.log(`---------------------------------`);
  };
  if (process.env.NODE_ENV === 'development') testLog();

  firstTestDone = true; // test log

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

  const postitems = dataObj.reduce((acc, post) => {
    const item = document.createElement('div');
    item.setAttribute('class', `post-list__${itemName}`);

    const postViewLink = `/${boardName}/${post.id}`;

    const KST = _addTime(post.createdAt, 9); // 🌟 GMT => KST 🌟
    const timeText = _processDateTime(KST);

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
