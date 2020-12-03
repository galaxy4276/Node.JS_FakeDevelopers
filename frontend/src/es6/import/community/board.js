/* Module */
import paginatePostList from '../../common/function/post/paginatePostList';

/* Constant */
const notice = {
  parentElem: document.querySelector('.post-list__notice'),
  path: 'community/notice',
  limit: 5,
};
const post = {
  parentElem: document.querySelector('.post-list__posts'),
  path: 'community/board',
  limit: 15,
};

/* Function */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    // paginatePostList(parentElem, boardName, limit) => 이렇게 호출하면 된다.

    // paginatePostList(Object.values(notice));
    paginatePostList(Object.values(post));
  },
  false
);
