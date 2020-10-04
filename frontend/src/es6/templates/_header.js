const menu = document.querySelector(".header__menu"),
  menuList = document.querySelector(".header__menu__list"),
  depth = document.querySelector(".header__menu__depth");

const HEADER_HOVERED = "header__menu__depth--open";

function showDepth() {
  depth.classList.add(HEADER_HOVERED);
}

function hideDepth() {
  depth.classList.remove(HEADER_HOVERED);
}

function init() {
  menuList.addEventListener("mouseover", showDepth);
  menu.addEventListener("mouseleave", hideDepth);
}

init();
