/* Module */
import getPostList from '../../common/function/post/_getPostList';

/* Constant */
const NOTICE_LIMIT = 5;
const POST_LIMIT = 15;

/* Variables */
// let currentPage = 1; // 페이지 네이션을 위한 현재 페이지를 가리키는 전역 변수

/* Function */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    const notice = document.querySelector('.post-list__notice');
    const post = document.querySelector('.post-list__post');

    // getPostList(parentElem, path, limit=10). page 파라미터는 아직 미구현
    getPostList(notice, 'announcement', NOTICE_LIMIT);
    getPostList(post, 'community', POST_LIMIT);
  },
  false
);
