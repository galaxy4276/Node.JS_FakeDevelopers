/* Module */
import fetchPostList from '../../common/function/post/_fetchPostList';

/* Constant */
const NOTICE_LIMIT = 5;
const POST_LIMIT = 15;

/* Function */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    const notice = document.querySelector('.post-list__notice');
    const post = document.querySelector('.post-list__post');

    // fetchPostList(parentElem, path, useFakeData = false, limit = 10) => 이렇게 호출하면 된다.

    // fetchPostList(notice, 'notice', false, NOTICE_LIMIT); // 원래 공지사항은 notice로 불러야 하지만
    fetchPostList(notice, 'board', false, NOTICE_LIMIT); // 서버측에서 notice 관련 API가 아직 미구현 상태기 때문에 board 게시물로 대체
    fetchPostList(post, 'board', false, POST_LIMIT);
  },
  false
);
