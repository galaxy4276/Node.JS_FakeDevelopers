const commentView = document.querySelector('.post-view__comment_data');
const sumbitBtn = document.querySelector('.post-view__comment-btn');
const referrer = document.querySelector('.referrer');
const data = document.querySelector('.post-view__comment-textarea').textContent;

console.log(`data: ${data}`);
console.log(`referrer: ${referrer}`);



const addCommentServer = () => {
  fetch('http://localhost:8001/', {
    method: 'POST',
    data
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

const init = () => {
  sumbitBtn.addEventListener('click', addCommentServer);
}

init();