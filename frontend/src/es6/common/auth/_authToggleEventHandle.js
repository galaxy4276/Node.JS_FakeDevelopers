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

export default authToggleEventHandle;
