const commentList = document.querySelector('.post-view__comment__list');

//TODO: 시간 가공하기
const getDate = () => {};

const addCommentBrowser = (commentInfo) => {
  console.log('프론트에 댓글 추가 됨.');

  const DOMfragment = document.createDocumentFragment();

  const commentItem = document.createElement('div');
  commentItem.classList.add('post-view__comment__item');

  //TODO: 내부 엘리먼트들 클래스 추가하기
  commentItem.innerHTML = `
<div>
  <span>${commentInfo.UserId}</span>
  <span>${commentInfo.createdAt}</span>
</div>
<div>${commentInfo.comment}</div>
`.trim();

  DOMfragment.append(commentItem);

  commentList.append(DOMfragment);
};

const postComment = async () => {
  const para = document.querySelector('.post-view__comment__textarea').value;
  const reqUrl = `${document.URL}/comment`;

  console.log(`작성내용 => ${para}`);
  console.log(`요청 API => ${reqUrl}`);

  const commentInfo = await fetch(reqUrl, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ data: para }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  console.log(commentInfo);

  addCommentBrowser(commentInfo);
};

const postViewInit = () => {
  const sumbitBtn = document.querySelector('.post-view__comment__btn');

  sumbitBtn.addEventListener('click', postComment, false);
};

document.addEventListener('DOMContentLoaded', postViewInit, false);
