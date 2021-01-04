import loading from '../components/_loading';

const isLoadingElem = (elem) => {
  if (!elem) return;

  const vaildElem = ['SUBMIT', 'BUTTON', 'A'];
  const vaildClassWord = ['auth', 'index', 'post'];

  // 엘리먼트 검증
  const tagName = elem.tagName;
  if (!vaildElem.includes(tagName)) return;

  // 클래스네임 검증
  const className = elem.className;
  if (!className) return false;
  const isVaildClass = vaildClassWord.find((word) => className.includes(word));
  if (!isVaildClass) return;

  return true;
};

const handleBeforePageLoad = (e) => {
  if (!isLoadingElem(e.target)) return;

  window.addEventListener('beforeunload', () => loading.on(0.3), false);
};

document.addEventListener('click', handleBeforePageLoad, false);
