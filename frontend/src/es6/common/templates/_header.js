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

document.addEventListener(
  'DOMContentLoaded',
  () => {
    initDropDownListHeight();
  },
  false
);
