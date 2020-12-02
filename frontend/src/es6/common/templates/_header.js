const dropdownMenuList = document.querySelectorAll(
  '.header-menu-dropdown__list'
);

const defaultHeight = 48.5;

const findMaximumMenuList = () => {
  let max = 0;
  dropdownMenuList.forEach((h) => {
    if (max < h.childNodes.length) max = h.childNodes.length;
  });
  return max;
};

let dropdownMenuMax = findMaximumMenuList();

dropdownMenuList.forEach((h) => {
  h.style.height = dropdownMenuMax * defaultHeight + 'px';
});
