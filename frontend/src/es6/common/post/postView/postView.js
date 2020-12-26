const commentView = document.querySelector('div.post-view__comment__data');
const sumbitBtn = document.querySelector('.post-view__comment-btn');
const referrer = document.querySelector('.referrer').textContent;

console.dir(commentView);

const getDate = () => {

}

const addCommentBrowser = comment => {
  console.log('프론트에 댓글 추가 됨.');
  const commentBody = document.createElement('div');
  commentBody.classList.add('post-view__comment__body');
  commentBody.style.display = 'flex';
  commentBody.style.flexDirection = 'column';

  /* --- commentBody 종속적 요소들 --- */
  const commentInfoDiv = document.createElement('div');
  const commentContentDiv = document.createElement('div');

  const userSpan = document.createElement('span');
  userSpan.innerText = comment.UserId;

  const createdAtSpan = document.createElement('span');
  createdAtSpan.innerText = comment.createdAt;

  /* --- commentContentDiv 는 댓글 내용 --- */
  /* --- commentInfoDiv 는 댓글 정보 (사용자, 생성일자 등 ), append 요소들 --- */
  commentInfoDiv.appendChild(userSpan);
  commentInfoDiv.appendChild(createdAtSpan);

  commentContentDiv.innerText = comment.comment;

  /* --- commentBody append 요소들 --- */
  commentBody.appendChild(commentInfoDiv);
  commentBody.appendChild(commentContentDiv);


  /* --- 결과 --- */
  commentView.appendChild(commentBody);
};

const addCommentServer = async () => {
  const data = document.querySelector('.post-view__comment-textarea').value;

  const comment = await fetch(`http://localhost:8001${referrer}/comment`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ data }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
  console.log(comment);
  addCommentBrowser(comment);
}

const init = () => {
  sumbitBtn.addEventListener('click', addCommentServer);
}

init();