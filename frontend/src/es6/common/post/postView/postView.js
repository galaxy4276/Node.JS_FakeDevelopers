import postNewComment from './_postNewComment';
import ckeckDelete from './_ckeckDelete';
import modal from '../../components/_modal';

const postViewInit = () => {
  // 댓글 작성
  const recommendLoginMsg = document.querySelector('.js-recommendLoginMsg');
  const sumbitBtn = document.querySelector('.post-view__comment__btn');

  if (!recommendLoginMsg) sumbitBtn.addEventListener('click', postNewComment, false);

  // .post-view__footer__btn--delete
  // 삭제 버튼 클릭시 모달창 띄우기
  const postDeleteBtn = document.querySelector('.post-view__footer__btn--delete');

  if (postDeleteBtn) postDeleteBtn.addEventListener('click', ckeckDelete, false);

  // 이미지가 있지만 개발모드라 불러오지 못할 때, 안내 메세지.
  if (process.env.NODE_ENV === 'development') {
    const contentBox = document.querySelector('.post-view__content');
    const isImage = contentBox.querySelector('output').dataset.isImageForLocalhost === 'true';

    if (!isImage) return;

    modal(() => {}, '⚙\n‼ 로컬호스트 환경 ‼\n이미지를 불러올 수 없습니다.');
  }
};

document.addEventListener('DOMContentLoaded', postViewInit, false);
