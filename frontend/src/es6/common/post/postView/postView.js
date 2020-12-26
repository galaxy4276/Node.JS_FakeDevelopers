import postNewComment from './_postNewComment';

const postViewInit = () => {
  const recommendLoginMsg = document.querySelector('.js-recommendLoginMsg');
  const sumbitBtn = document.querySelector('.post-view__comment__btn');

  if (!recommendLoginMsg) sumbitBtn.addEventListener('click', postNewComment, false);
};

document.addEventListener('DOMContentLoaded', postViewInit, false);
