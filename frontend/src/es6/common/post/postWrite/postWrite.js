const postForm = document.body.querySelector('.post-write__form');
const postSubmit = document.body.querySelector('.post-write__submit');

const blockClick = () => {
  postSubmit.disabled = true;
};

postForm.addEventListener('submit', blockClick, false);
