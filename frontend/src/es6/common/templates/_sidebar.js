const sidebar = document.querySelector('.sidebar');
const sideUtilBtn = document.querySelector('.header-util__btn');
const sideWrap = document.querySelector('.cover');
const sideList = document.querySelector('.sidebar__list');

function toggleDropdown(e) {
  // ** 드롭다운 이벤트 **
  // sideList 전체에 이벤트 리스너를 걸었을 때 화면에서 클릭 이벤트가 발생할 수 있는 요소는

  if (e.target === this) return;
  // 1. sideList의 공백 부분 (😫 종료시킨다!)
  if (e.target.tagName === 'A') return;
  // 2. 각 타이틀의 드롭다운이 펼쳐졌을때 나오는 각 링크들 (😫 종료시킨다!)

  const currTitle = e.target.closest('li');
  // 3. 각 타이틀 버튼의 caretDown 아이콘 (🙄 가장 가까운 li 부모 요소로 이벤트 타겟이 전환된다)
  // 4. 각 타이틀 버튼 그 자체 (😀 가장 가까운 li 부모 요소는 자기자신이다. 클릭한 이벤트 타겟 그대로 실행된다)

  const currInnerList = currTitle.querySelector('.sidebar__inner-list');
  const allTitles = Array.from(sideList.children);

  allTitles.forEach((title) => {
    // 현재 클릭한 타이틀을 제외한 다른 타이틀의 드롭다운 모두 접기
    if (title === currTitle) return;
    const innerList = title.querySelector('.sidebar__inner-list');
    title.classList.remove('sidebar__btn--active');
    innerList.classList.remove('sidebar__inner-list--clicked');
  });

  currTitle.classList.toggle('sidebar__btn--active');
  currInnerList.classList.toggle('sidebar__inner-list--clicked');
}

function toggleSideBar() {
  sidebar.classList.toggle('sidebar--show');
  sideWrap.classList.toggle('cover--covered');
}

function initSidebar() {
  sideUtilBtn.addEventListener('click', toggleSideBar, false);
  sideWrap.addEventListener('click', toggleSideBar, false);

  sideList.addEventListener('click', toggleDropdown, false);
}
initSidebar();
