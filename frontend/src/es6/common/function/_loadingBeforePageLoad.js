import loading from '../components/_loading';

const verifyLoading = (elem) => {
  if (!elem) return;

  const vaildElem = ['SUBMIT', 'BUTTON', 'A'];
  const vaildClassWord = ['auth', 'index', 'post'];

  const tagName = elem.tagName;

  if (!vaildElem.includes(tagName)) return false;

  const className = elem.className;

  if (!className) return false;

  const isVaildClass = vaildClassWord.find((word) => className.includes(word));

  if (!isVaildClass) return false;

  return true;
};

const handleBeforePageLoad = (e) => {
  if (!verifyLoading(e.target)) return;

  window.addEventListener('beforeunload', loading.on, false);
};

document.addEventListener('click', handleBeforePageLoad, false);
