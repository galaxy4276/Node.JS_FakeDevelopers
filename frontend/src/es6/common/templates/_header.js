const dropdownMenuList = document.querySelectorAll(
  '.header-menu-dropdown__list'
);

const findMaxHeight = () => () => {
  let maxHeight = 0;
  dropdownMenuList.forEach((h) => {
    if (maxHeight < h.offsetHeight) maxHeight = h.offsetHeight;
  });
  return maxHeight;
};

let dropdownMenuHeight = findMaxHeight();

dropdownMenuList.forEach((h) => {
  h.style.height = dropdownMenuHeight() + 'px';
});
