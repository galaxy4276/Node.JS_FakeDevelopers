const postList = document.querySelector('.post-list');
const notice = postList.querySelector('.post-list__notice');
const post = postList.querySelector('.post-list__post');

/* Test Code for set default style in CSS*/
const setFakeData = (items) => {
  const name = items.length === 10 ? 'notice' : 'post';

  const exData = {
    number: 1234,
    title: name === 'notice' ? '공지사항입니다.' : '유저 게시글입니다.',
    writer: name === 'notice' ? 'admin' : 'Anonymous',
    hit: 1234,
    regDate: '0000-00-00',
  };

  items.forEach((item) => {
    const props = Array.from(item.children);
    const data = exData;
    const keys = Object.keys(data);

    props.forEach((prop, i) => {
      prop.textContent = data[keys[i]];
    });
  });
};

document.body.onload = () => {
  const noticeItems = Array.from(notice.children);
  const postItems = Array.from(post.children);

  setFakeData(noticeItems);
  setFakeData(postItems);
};
