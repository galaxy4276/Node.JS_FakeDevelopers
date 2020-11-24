const sidebar = document.querySelector(".sidebar");
const sideUtilBtn = document.querySelector(".header-util__btn");
const sideWrap = document.querySelector(".cover");
const sideList = document.querySelector(".sidebar__list");

function toggleDropdown(e) {
  // ** 드롭다운 이벤트 **
  // sideList 전체에 이벤트 리스너를 걸었을 때 화면에서 클릭 이벤트가 발생할 수 있는 요소는
  // 1. sideList의 공백 부분 (😫 종료시킨다!)
  // 2. 각 타이틀의 드롭다운이 펼쳐졌을때 나오는 각 링크들 (😫 종료시킨다!)
  // 3. 각 타이틀 버튼의 caretDown 아이콘 (🙄 가장 가까운 li 부모 요소로 이벤트 타겟이 전환된다)
  // 4. 각 타이틀 버튼 그 자체 (😀 클릭한 이벤트 타겟 그대로 실행된다)

  if (e.target === this) return; // 공백부분이라면 종료
  if (e.target.tagName === "A") return; // 드롭다운 링크들이라면 종료

  const title = e.target.closest("li");
  const innerList = title.querySelector(".sidebar__inner-list");

  innerList.classList.toggle("sidebar__inner-list--clicked");
  title.classList.toggle("sidebar__btn--active");
}

function toggleSideBar() {
  sidebar.classList.toggle("sidebar--show");
  sideWrap.classList.toggle("cover--covered");
}

function initSidebar() {
  sideUtilBtn.addEventListener("click", toggleSideBar, false);
  sideWrap.addEventListener("click", toggleSideBar, false);

  sideList.addEventListener("click", toggleDropdown, false);
}
initSidebar();
