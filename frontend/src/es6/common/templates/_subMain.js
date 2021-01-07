const warnEmpty = (name) => {
  if (!!name === false) return;

  console.warn(
    `'${name}' 이(가) 존재하지 않습니다. index 페이지이거나 헤당 엘리먼트에 변경이 있습니다.`
  );
};

const isEmpty = (elem, className = '') => {
  if (!!elem === false) {
    if (process.env.NODE_ENV === 'development') warnEmpty(className);

    return true;
  } //
  else return false;
};

const onNavColor = () => {
  const utilList = document.querySelector('.sub-contents__util-list');

  if (isEmpty(utilList, '.sub-contents__util-list')) return;

  const currCategory = utilList.lastElementChild.textContent;

  const navList = document.querySelector('.sub-nav__list');

  if (isEmpty(navList, '.sub-nav__list')) return;

  const currNav = Array.from(navList.children).find(
    (item) => item.firstChild.textContent === currCategory
  );

  currNav.style.color = 'white';
  currNav.style.backgroundColor = '#149ab8';
};

document.addEventListener('DOMContentLoaded', onNavColor, false);
