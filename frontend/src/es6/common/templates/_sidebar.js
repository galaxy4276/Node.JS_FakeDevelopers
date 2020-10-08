const introBtn = document.querySelector(".sidebar__intro"),
  careerBtn = document.querySelector(".sidebar__career"),
  communityBtn = document.querySelector(".sidebar__community"),
  historyBtn = document.querySelector(".sidebar__history"),
  utilBtn = document.querySelector(".header-util__btn"),
  sidebar = document.querySelector(".sidebar"),
  cover = document.querySelector(".cover");

function showDropdown(event) {
  const innerList = event.target.parentNode.querySelector(
    ".sidebar__inner-list"
  );
  innerList.classList.toggle("sidebar__inner-list--clicked");
  event.target.classList.toggle("sidebar__btn--active");
}

function showSideBar(event) {
  sidebar.classList.add("sidebar--show");
  cover.classList.add("cover--covered");
}

function closeSidebar() {
  sidebar.classList.remove("sidebar--show");
  cover.classList.remove("cover--covered");
}

function init() {
  introBtn.addEventListener("click", showDropdown);
  careerBtn.addEventListener("click", showDropdown);
  communityBtn.addEventListener("click", showDropdown);
  historyBtn.addEventListener("click", showDropdown);
  utilBtn.addEventListener("click", showSideBar);
  cover.addEventListener("click", closeSidebar);
}
init();
