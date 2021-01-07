/* Module */
import requestURL from '../../function/_requestURL';
import defaultFetch from '../../function/_defaultFetch';
import processToElems from './_processToElems';
import loading from '../../components/_loading';

/* Constants */
const pagination = document.body.querySelector('.post-list__inner-paging'); // 페이지네이션 버튼들을 자식으로 가진 element
const pageNumList = pagination.querySelector('.post-list__paging-numbers');

/* Global Variables */
let firstCall = true; // 모듈이 처음으로 불린건지 검증
let currentPageNumber = 1; // 현재 페이지 - default = page 1
let isNoPosts = false; // 불러올 데이터가 없는지 검증

/* Function */
const guideNoPosts = () => {
  const postListBody = document.body.querySelector('.post-list');
  const posts = postListBody.querySelector('.post-list__posts');

  const msg = document.createElement('section');
  msg.setAttribute('class', 'post-list__empty-guide-msg');

  msg.innerHTML = `
<div class="post-list__empty-guide-msg__wrapper">
  <p class="post-list__empty-guide-msg__title">⚠ 아직 게시글이 존재하지 않습니다.</p>
  <p class="post-list__empty-guide-msg__txt">첫 게시글의 주인공이 되어주세요!</p>
</div>
`.trim();

  const DOMfragement = new DocumentFragment();

  DOMfragement.append(msg);

  postListBody.replaceChild(DOMfragement, posts);
};

const logGlobalVariableError = () => {
  console.error(
    '⛔ [ _paginate.js ] 모듈이 export하는 paginatePostList() 에서 전역변수가 생성된 후에 이 함수를 호출해야 유효한 동작을 수행합니다.'
  );
};

const getGlobalVariable = (name) => {
  if (!window[Symbol.for(name)]) logGlobalVariableError();

  return window[Symbol.for(name)][0];
};

const setGlobalVariable = (key, ...value) => (window[Symbol.for(key)] = value);

const getLastPageNum = async () => {
  const [, boardName, limit] = getGlobalVariable('option');

  const path = `/${boardName}/api/index?limit=${limit}`;
  requestURL.path = path;

  // API 요청으로 마지막 페이지 번호 가져오기
  const lastPageNum = await defaultFetch(requestURL.url).then((res) => {
    // 게시물이 있다면
    if (res.idx) {
      return res.idx;
    }
    // 게시물이 없다면
    else {
      if (process.env.NODE_ENV === 'development') {
        // 개발모드일땐 경고 안내문 띄우기
        console.warn(
          '데이터베이스에 불러올 데이터가 하나도 없거나 서버측의 코드 변경 혹은 응답 오류입니다.'
        );
      }
      isNoPosts = true;
      return 1;
    }
  });

  // 가져온 마지막 페이지 번호를 전역변수에 저장
  setGlobalVariable('LAST_PAGE', lastPageNum);
};

const initPageNumList = () => {
  const DOMfragment = document.createDocumentFragment();

  const pageNum = document.createElement('li');
  pageNum.setAttribute('class', 'post-list__paging-numbers__number');

  const addPageNum = (cnt) => {
    // 주어진 cnt 만큼 페이지 번호 엘리먼트를 추가
    for (let i = 0; i < cnt; i++) {
      const childNum = pageNum.cloneNode();
      childNum.textContent = i + 1;
      DOMfragment.appendChild(childNum);
    }
  };

  const LAST_PAGE = getGlobalVariable('LAST_PAGE');

  if (LAST_PAGE < 10) {
    addPageNum(LAST_PAGE);
  } else {
    addPageNum(10);
  }

  pageNumList.appendChild(DOMfragment);
};

const toggleDisplayMoveBtns = () => {
  const LAST_PAGE = getGlobalVariable('LAST_PAGE');

  const leftBtn = document.body.querySelector('.post-list__paging-chevron--left');
  if (currentPageNumber == 1) leftBtn.classList.add('post-list__paging-chevron--disabled');
  else leftBtn.classList.remove('post-list__paging-chevron--disabled');

  const rightBtn = document.body.querySelector('.post-list__paging-chevron--right');
  if (currentPageNumber == LAST_PAGE) rightBtn.classList.add('post-list__paging-chevron--disabled');
  else rightBtn.classList.remove('post-list__paging-chevron--disabled');
};

const toggleHighlightCurrPageNum = () => {
  const pageNumbers = Array.from(pageNumList.children); // 페이지네이션의 숫자 버튼들

  pageNumbers.forEach((pageNum) => {
    if (pageNum.textContent == currentPageNumber)
      pageNum.classList.toggle('post-list__paging-numbers__number--highlight'); // css 파일에서 페이지 넘버 강조 스타일이 적용된 클래스 네임
  });
};

const getPostList = (parentElem, boardName, limit = 15, page = 1) => {
  const path = `/${boardName}/api?limit=${limit}&page=${page}`;

  requestURL.path = path;

  // test
  const testLog = (res) => {
    if (process.env.NODE_ENV !== 'development') return res;

    console.log(`요청 API => ${path}`);

    if (res.postsList.length !== limit)
      console.warn(
        ' 쿼리문으로 요청한 데이터 수와 받아온 데이터 수가 다릅니다.\n',
        ' ▶ 마지막 페이지이거나 서버측 코드가 변경되었습니다.'
      );

    return res;
  };

  return defaultFetch(requestURL.url)
    .then((res) => testLog(res) /* Just log => data not change */)
    .then((res) => processToElems(boardName, res.postsList))
    .then((DOMfragment) => parentElem.appendChild(DOMfragment))
    .catch(console.error);
};

const putPostsList = (pageNum) => {
  const [parentElem, boardName, limit] = getGlobalVariable('option');

  parentElem.innerHTML = ''; // postList 초기화

  currentPageNumber = !isNaN(pageNum) // 클릭한 페이지 번호로 전역변수 currentPageNumber를 설정하는데,
    ? pageNum // pageNum가 숫자라면 그대로,
    : pageNum.textContent; // element라면 textContent로 값 삽입)

  return getPostList(parentElem, boardName, limit, currentPageNumber); // 현재 페이지와 전역변수에 저장했던 옵션으로 정보 요청
};

const turnPage = (clickedBtn) => {
  // | < 1 2 3 4 5 > | 같이 5개 버튼을 가진 페이지 네이션이 있다고 할 때,
  // 이 페이지의 버튼 개수는 5개, 초기 '중간 위치 이후 번호'는 3이라 한다. (중간 위치 이후 번호는 아래부터 중간 번호라고 칭한다)
  // 이 페이지 네이션의 페이지 전체 개수가 25개 라고 가정할 때,
  // 다음과 같이 동작하도록 구현한다.
  // 기본적으로는 클릭한 숫자가 가운데로 오게 하며, 아래와 같은 경우는 예외로 한다.
  // 현재 페이지가 1, 2, 3 인 경우엔 1이 페이지네이션을 | < 1 2 3 4 5 > | 로 고정한다. (숫자 클릭시에 음수로 가지 않게 설정한다)
  // 현재 페이지가 25, 24, 23 인 경우엔, | < 21 22 23 24 25 > | 로 고정한다. (숫자 클릭시에 최대 페이지 수를 초과하지 않도록 설정한다)
  const LAST_PAGE = getGlobalVariable('LAST_PAGE');

  const pageNumbers = Array.from(pageNumList.children); // 페이지네이션의 숫자 버튼들
  const numBtnCnt = pageNumbers.length; // 숫자 버튼의 개수
  const nums = pageNumbers.map((pagenum) => parseInt(pagenum.textContent)); // 숫자 버튼의 숫자 목록

  const center = Math.ceil(numBtnCnt / 2) - 1; // 숫자 버튼을 리스트 중 가운데 번호의 인덱스
  const midPrev = numBtnCnt % 2 === 1 ? center : center - 1; // 정중앙에서 왼쪽 방향으로 가장 먼저 오는 번호의 인덱스
  const midNext = numBtnCnt % 2 === 1 ? center : center + 1; // 정중앙에서 오른쪽 방향으로 가장 먼저 오는 번호의 인덱스

  const midPrevNum = nums[midPrev]; // 정중앙에서 왼쪽 방향으로 가장 먼저 오는 번호
  const midNextNum = nums[midNext]; // 정중앙에서 오른쪽 방향으로 가장 먼저 오는 번호
  const firstBtnNum = nums[0]; // 첫번째 숫자 버튼의 숫자
  const lastBtnNum = nums[numBtnCnt - 1]; // 마지막 숫자 버튼의 숫자

  const changePageNumsValue = (num) => {
    // 전달된 숫자만큼 페이지네이션 번호 전체를 더하는 함수 ( 음수 전달시 뺄셈이 됨 )
    if (firstBtnNum + num < 1) {
      // 계산결과 첫번째 버튼이 페이지 1 아래로 내려가려 한다면
      pageNumbers.forEach((pageNum, i) => (pageNum.textContent = i + 1));
      // ( ex - | < 1 2 3 4 5 > | ) 첫 페이지에 고정하고 종료
      return;
    } //
    else if (lastBtnNum + num > LAST_PAGE) {
      // 계산결과 마지막 버튼이 최종 페이지보다 위로 올라가려 한다면
      pageNumbers.forEach((pageNum, i) => (pageNum.textContent = LAST_PAGE - numBtnCnt + i + 1));
      // ( ex - | < 21 22 23 24 25 > | ) 최종 페이지에 고정하고 종료
      return;
    } //
    else {
      // 계산 결과에 문제가 없다면
      // 전달된 숫자만큼 페이지네이션 번호 전체를 더하거나 빼기
      pageNumbers.forEach((pageNum) => {
        pageNum.textContent = parseInt(pageNum.textContent) + num;
      });
    }
  };

  switch (clickedBtn.textContent) {
    case '이전 페이지': // < 버튼 일때
      if (firstBtnNum !== 1 && currentPageNumber <= midPrevNum) {
        // 처음 버튼이 1이 아니고
        // 현재 페이지 번호가 가운데 숫자보다 작거나 같은 경우에만 모든 페이지 번호를 -1
        // (번호 개수가 짝수일땐 가운데 이전 숫자)
        changePageNumsValue(-1);
      }
      currentPageNumber--; // 전역변수 currentPageNumber를 -1
      break;

    case '다음 페이지': // > 버튼 일때
      if (lastBtnNum !== LAST_PAGE && currentPageNumber >= midNextNum) {
        // 마지막 버튼이 마지막 페이지의 번호가 아니고
        // 현재 페이지 번호가 가운데 숫자보다 크거나 같은 경우에만 모든 페이지 번호를 +1
        // (번호 개수가 짝수일땐 가운데 다음 숫자)
        changePageNumsValue(+1);
      }
      currentPageNumber++; // 전역변수 currentPageNumber를 +1
      break;

    default:
      // 숫자 버튼일때
      const clickedNum = parseInt(clickedBtn.textContent); // 클릭한 숫자버튼의 숫자
      const diff = clickedNum - currentPageNumber; // 클릭한 숫자와 현재 페이지와의 차이

      changePageNumsValue(clickedNum - midNextNum); // (클릭한 숫자 - midNextNum) 만큼 모든 페이지 번호를 변경.
      // < 1 2 3 4 5 > 를 예로 들면, midNextNum은 3이 나옴
      // 1. < 1 2 >
      // < 1 2 > 를 클릭하면 (클릭한 숫자 - midNextNum) 가 음수가 나오는데,
      // 전달된 숫자만큼 전체 페이지를 이동시키는 changePageNumsValue 에서 페이지를 1 밑으로 떨어뜨릴 수 없게 제어함
      // 페이지 목록이 < 1 2 3 4 5 > 로 유지됨
      // 2. < 3 >
      // < 3 > 을 클릭하면 (클릭한 숫자 - midNextNum) 는 0.
      // 페이지 목록이 < 1 2 3 4 5 > 로 유지됨
      // 3. < 4 5 >
      // < 4 5 > 를 클릭하면 (클릭한 숫자 - midNextNum) 는 양수가 되고,
      // changePageNumsValue 에서 전달된 숫자만큼 전체 페이지 목록을 변경시켜서
      // 클릭한 숫자가 목록의 가운데 오게 만듬

      currentPageNumber += diff; // 전역변수 currentPageNumber를 클릭한 숫자와 현재 페이지와의 차이만큼 변경
  }
};

const handlePaginationBtnsClick = async (e) => {
  let clickedBtn = e.target;

  if (clickedBtn.tagName === 'UL') return; // 클릭된 것이 버튼이 아닌 여백 공간이라면 종료
  if (clickedBtn.tagName === 'LI' && clickedBtn.textContent == currentPageNumber) return; // 클릭된 것이 현재 페이지 번호일땐 종료
  if (clickedBtn.tagName === 'path') clickedBtn = e.target.closest('svg'); // 클릭된 것이 svg의 path라면 svg로 이벤트 타겟 변경

  loading.on();

  toggleHighlightCurrPageNum(); // 이전 페이지 번호 강조 off
  turnPage(clickedBtn); // 페이지 넘기기 (currentPageNumber 변경)

  await putPostsList(currentPageNumber); // 변경한 currentPageNumber로 그에 맞는 데이터 불러오기

  toggleHighlightCurrPageNum(); // 현재 페이지 번호 강조 on
  toggleDisplayMoveBtns(); // 만약 현재 페이지가 1페이지면 < 버튼, 마지막 페이지면 > 버튼 삭제

  loading.off();
};

const postList = async (reqOptions) => {
  setGlobalVariable('option', reqOptions); // 서버에 요청할때 쓸 옵션을 인자로 받아 전역변수에 저장

  loading.on();

  if (firstCall) {
    // 웹 페이지 최초 접속시에
    await getLastPageNum(); // 서버에서 마지막 페이지의 번호를 받아와서 전역변수에 저장

    initPageNumList(); //  페이지 번호 리스트 초기화
    toggleDisplayMoveBtns(); //  < , > 버튼 삭제 판별 (1페이지 혹은 마지막 페이지 일때)
    toggleHighlightCurrPageNum(); //  현재 페이지 강조

    if (isNoPosts) {
      // 위의 getLastPageNum() 에서 데이터가 하나도 없다고 나오면,
      loading.off();
      guideNoPosts(); // 안내 메시지를 생성하고
      return; // 종료
    }

    firstCall = false;
  }

  await putPostsList(currentPageNumber); //첫 데이터 불러오기

  loading.off();

  pagination.addEventListener('click', handlePaginationBtnsClick, false); // 페이지네이션의 버튼 클릭시에 그에 맞는 데이터 호출
};

/* export */
export default postList;
