import postNewComment from './_postNewComment';
import ckeckDelete from './_ckeckDelete';

const postViewInit = () => {
  // 댓글 작성
  const recommendLoginMsg = document.querySelector('.js-recommendLoginMsg');
  const sumbitBtn = document.querySelector('.post-view__comment__btn');

  if (!recommendLoginMsg) sumbitBtn.addEventListener('click', postNewComment, false);

  // .post-view__footer__btn--delete
  // 삭제 버튼 클릭시 모달창 띄우기
  const postDeleteBtn = document.querySelector('.post-view__footer__btn--delete');

  postDeleteBtn.addEventListener('click', ckeckDelete, false);
};

document.addEventListener('DOMContentLoaded', postViewInit, false);
