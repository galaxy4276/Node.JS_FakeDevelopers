const sidebar = document.querySelector(".sidebar");
const utilBtn = document.querySelector(".header-util__btn");
const cover = document.querySelector(".cover");
const sideList = document.querySelector(".sidebar__list");

function showDropdown(e) {
  let title = e.target.closest("div");

  if (title.tagName === "UL") return;
  if (title.tagName === "svg" || title.tagName === "path")
    title = e.target.closest("div").closest("div"); // svg를 감싸는 div를 거쳐, title div를 선택

  if (!sideList.contains(title)) return; // 클릭한게 드롭다운 inner-list의 링크면 종료

  const innerList = title.parentNode.querySelector(".sidebar__inner-list");
  innerList.classList.toggle("sidebar__inner-list--clicked");
  title.classList.toggle("sidebar__btn--active");
}

function toggleSideBar() {
  sidebar.classList.toggle("sidebar--show");
  cover.classList.toggle("cover--covered");
}

function initSidebar() {
  utilBtn.addEventListener("click", toggleSideBar, false);
  cover.addEventListener("click", toggleSideBar, false);

  sideList.addEventListener("click", showDropdown, false);
}
initSidebar();
