import loading from '../components/_loading';

const verifyLoading = (elem) => {
  if (!elem) return;

  const loadingVaildElem = ['SUBMIT', 'BUTTON', 'A'];
  const loadingVaildClassWord = ['auth', 'index', 'post'];

  const tagName = elem.tagName;

  if (!loadingVaildElem.includes(tagName)) return false;

  const className = elem.className;

  if (!className) return false;

  let isVaildClass = false;

  loadingVaildClassWord.forEach((word) => {
    isVaildClass = className.includes(word);
  });

  if (!isVaildClass) return false;

  return true;
};

const handleBeforePageLoad = (e) => {
  if (!verifyLoading(e.target)) return;

  window.addEventListener('beforeunload', loading.on, false);
};

document.addEventListener('click', handleBeforePageLoad, false);
