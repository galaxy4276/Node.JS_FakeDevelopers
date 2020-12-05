/* Module */
import paginatePostList from '../../common/post/postList/paginatePostList';

/* Constant */
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
    paginatePostList(Object.values(post));
  },
  false
);
