const postWrite = document.body.querySelector('.post-write');

const blockDragFileExecution = (e) => {
  e.preventDefault();
};

const blockClick = (e) => {
  const submit = postWrite.querySelector('.post-write__submit__btn');

  submit.disabled = true;
};

const postWriteInit = () => {
  const form = postWrite.querySelector('.post-write__form');
  const fileBox = postWrite.querySelector('.post-write__file__box');

  form.addEventListener('submit', blockClick, false);
  fileBox.addEventListener('change', blockDragFileExecution, false);
};

document.addEventListener('DOMContentLoaded', postWriteInit, false);
