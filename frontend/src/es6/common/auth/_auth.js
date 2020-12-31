// TODO: input 두개 다 valid 일 때 (텍스트가 있을 때) 버튼 필터 제거

/* --- */
/* 로그인, 회원가입 창 열고닫기  */

const loginOpenBtns = document.querySelectorAll('.js-loginOpenBtn'); // 로그인 열기 버튼
const loginCloseBtn = document.querySelector('.login__form__close-btn'); // 로그인 닫기 버튼
const loginWindow = document.querySelector('.login'); // 로그인 창

const joinOpenBtns = document.querySelectorAll('.js-joinOpenBtn'); // 회원가입 열기 버튼
const joinCloseBtn = document.querySelector('.join__form__close-btn'); // 회원가입 닫기 버튼
const joinWindow = document.querySelector('.join'); // 회원가입 창

const toggleloginWindow = () => {
  loginWindow.classList.toggle('login--show');
};

const togglejoinWindow = (e) => {
  let currentBtn = e.target;
  let isBtnInLoginWindow = currentBtn.classList.contains('login__form__join-open-btn');

  if (isBtnInLoginWindow) toggleloginWindow(); // join 버튼이 로그인 창 안에 있는 버튼이라면 로그인 창 닫기

  joinWindow.classList.toggle('join--show');
};

const authToggleEventHandle = () => {
  loginOpenBtns.forEach((loginOpenBtn) => {
    loginOpenBtn.addEventListener('click', toggleloginWindow, false);
  });
  loginCloseBtn.addEventListener('click', toggleloginWindow, false);

  joinOpenBtns.forEach((joinOpenBtn) => {
    joinOpenBtn.addEventListener('click', togglejoinWindow, false);
  });
  joinCloseBtn.addEventListener('click', togglejoinWindow, false);
};

/* --- */
/* -- 타입이 이메일인 input 요소 클릭시 label 포지션 변경 후 그 자리에 고정시키는 이벤트 --*/

let raised = false;

const raiseLabel = (e) => {
  const next = (element) => {
    // nextSibling 의 줄바꿈 요소(undifined 요소) 참조를 무시해주는 함수
    do {
      element = element.nextSibling;
    } while (element && element.nodeType !== 1);
    return element;
  };

  let input = e.target;
  let label = next(input); // input 뒤에 오는 label

  input.style.fontSize = '1.5rem';
  label.style.top = '-1.5rem';
  label.style.left = '0';
  label.style.fontSize = '0.9rem';
  label.style.opacity = '1';
  label.style.color = ' #bebebe';

  raised = true;
};

/* --- */
/* -- 로그아웃 버튼 --*/
const initLogoutBtnsHref = () => {
  const logoutBtns = document.body.querySelectorAll('.js-logoutBtn');

  if (!logoutBtns) return;

  const host =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001'
      : 'https://www.ddccomputer.club';

  logoutBtns.forEach((logoutBtn) => logoutBtn.setAttribute('href', `${host}/auth/logout`));
};

/* --- */
/* -- 로그인 성공, 실패에 따른 이벤트 분기 --*/
const handleLoginSuccess = () => {
  // TODO: modal로 바꾸기
  alert('로그인 성공');
};

const handleLoginFailure = () => {
  // TODO: modal로 바꾸기
  alert('로그인 실패');
};

const handleLoginResult = () => {
  // query는 둘 중 하나입니다.
  // 1. ?success=login_done
  // 2. ?failure=login_failure

  const resultReg = /(?<=^https?:\/\/.+\/\?)((success|failure)(?==login_(?:done|failure)))?/;
  const loginResult = resultReg.exec(document.URL); // 'success' | 'failure' | null

  if (!loginResult) return; // 로그인 시도가 아니라면 return

  const result = loginResult[0];

  switch (result) {
    case 'success':
      handleLoginSuccess();
      break;
    case 'failure':
      handleLoginFailure();
      break;
  }
};

window.onload = () => {
  const emailInputs = document.querySelectorAll('.js-emailInput');

  emailInputs.forEach((input) => {
    input.addEventListener('click', !raised ? raiseLabel : {}, { once: true });
    input.addEventListener('focus', !raised ? raiseLabel : {}, { once: true });
  });

  initLogoutBtnsHref();
  authToggleEventHandle();
  handleLoginResult();
};
