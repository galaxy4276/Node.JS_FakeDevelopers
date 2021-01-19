import joinValueVerification from './_joinValueVerification';

// TODO: auth 창 on/off 객체 메소드로 만들기

const loginWindow = document.querySelector('.login');
const joinWindow = document.querySelector('.join');

const clearAuthInputs = () => {
  const inputs = document.querySelectorAll('.js-authInput');

  inputs.forEach((input) => (input.value = ''));
};

const openLoginWindow = () => {
  loginWindow.classList.add('login--show');
};

const closeLoginWindow = () => {
  clearAuthInputs();

  loginWindow.classList.remove('login--show');
};

const openJoinWindow = (e) => {
  if (e) {
    let currentBtn = e.target;
    let isBtnInLoginWindow = currentBtn.classList.contains('login__form__join-open-btn');

    if (isBtnInLoginWindow) closeLoginWindow(); // join 버튼이 로그인 창 안에 있는 버튼이라면 로그인 창 닫기
  }

  joinWindow.classList.add('join--show');
};

const closeJoinWindow = (e) => {
  clearAuthInputs();

  if (e) {
    let currentBtn = e.target;
    let isBtnInLoginWindow = currentBtn.classList.contains('login__form__join-open-btn');

    if (isBtnInLoginWindow) closeLoginWindow(); // join 버튼이 로그인 창 안에 있는 버튼이라면 로그인 창 닫기
  }

  joinWindow.classList.remove('join--show');
};

const authToggleEventHandle = () => {
  if (!document.querySelector('.js-loginOpenBtn')) return;

  const loginOpenBtns = document.querySelectorAll('.js-loginOpenBtn'); // 로그인 열기 버튼
  const loginCloseBtn = document.querySelector('.login__form__close-btn'); // 로그인 닫기 버튼

  loginOpenBtns.forEach((loginOpenBtn) => {
    loginOpenBtn.addEventListener('click', openLoginWindow, false);
  });
  loginCloseBtn.addEventListener('click', closeLoginWindow, false);

  const joinOpenBtns = document.querySelectorAll('.js-joinOpenBtn'); // 회원가입 열기 버튼
  const joinCloseBtn = document.querySelector('.join__form__close-btn'); // 회원가입 닫기 버튼

  joinOpenBtns.forEach((joinOpenBtn) => {
    joinOpenBtn.addEventListener('click', openJoinWindow, false);
  });
  joinCloseBtn.addEventListener('click', closeJoinWindow, false);
};

export { openLoginWindow, openJoinWindow, authToggleEventHandle };
