const postList = document.querySelector('.post-list');
const notice = postList.querySelector('.post-list__notice');
const post = postList.querySelector('.post-list__post');

/* Test Code for set default style in CSS*/
const setFakeData = (items) => {
  const name = items[0].classList[1].match(/(?<=__).*(?=__)/)[0]; // 'notice' || 'post'

  const exData = {
    number: name === 'notice' ? '[공지사항]' : 1234,
    title: name === 'notice' ? '공지사항입니다.' : '유저 게시글입니다.',
    writer: name === 'notice' ? 'admin' : 'Anonymous',
    hit: name === 'notice' ? 12345 : 1234,
    regDate: '0000-00-00',
  };

  items.forEach((item) => {
    const props = Array.from(item.children);
    const data = exData;

    props.forEach((prop, i) => {
      let propName = prop.classList[0].match(/(?<=^.*__.*__).*$/)[0]; // 'number' || 'title' || 'writer' || 'hit' || 'reg-date'
      if (propName === 'reg-date') propName = 'regDate';
      prop.textContent = data[propName];
    });
  });
};

document.body.onload = () => {
  const noticeItems = Array.from(notice.children);
  const postItems = Array.from(post.children);

  setFakeData(noticeItems);
  setFakeData(postItems);
};
