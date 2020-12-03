/* Module */
import paginatePostList from '../../common/function/post/paginatePostList';

/* Constant */
const notice = {
  parentElem: document.querySelector('.post-list__posts'),
  path: 'community/notice',
  limit: 15,
};

/* Function */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    // paginatePostList(parentElem, boardName, limit) => 이렇게 호출하면 된다.

    paginatePostList(Object.values(notice));
  },
  false
);
