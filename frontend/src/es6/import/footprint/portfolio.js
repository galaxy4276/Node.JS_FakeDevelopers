/* Module */
import postList from '../../common/post/postList/postList';

/* Constant */
const post = {
  parentElem: document.querySelector('.post-list__posts'),
  path: 'footprint/portfolio',
  limit: 15,
};

/* Function */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    // postList(parentElem, boardName, limit) => 이렇게 호출하면 된다.
    postList(Object.values(post));
  },
  false
);
