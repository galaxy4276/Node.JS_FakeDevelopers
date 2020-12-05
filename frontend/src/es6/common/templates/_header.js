const initDropDownListHeight = () => {
  const dropdownMenuList = document.querySelectorAll('.header-menu-dropdown__list');

  const defaultHeight = 48;

  const findMaximumMenuList = () => {
    let max = 0;
    dropdownMenuList.forEach((h) => {
      if (max < h.children.length) max = h.children.length;
    });
    return max;
  };

  let dropdownMenuMax = findMaximumMenuList();

  dropdownMenuList.forEach((h) => {
    h.style.height = dropdownMenuMax * defaultHeight + 'px';
  });
};

const initLogoutBtnHref = () => {
  const logoutBtn = document.body.querySelector('.header-util__link--logout');

  if (!logoutBtn) return;

  const host =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001'
      : 'https://www.ddccomputer.club';

  logoutBtn.setAttribute('href', `${host}/auth/logout`);
};

document.addEventListener(
  'DOMContentLoaded',
  () => {
    initDropDownListHeight();
    initLogoutBtnHref();
  },
  false
);
