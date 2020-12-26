import postNewComment from './_postNewComment';

const postViewInit = () => {
  const sumbitBtn = document.querySelector('.post-view__comment__btn');

  sumbitBtn.addEventListener('click', postNewComment, false);
};

document.addEventListener('DOMContentLoaded', postViewInit, false);
