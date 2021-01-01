const clearAuthInputs = () => {
  const inputs = document.querySelectorAll('.js-authInput');

  inputs.forEach((input) => (input.value = ''));
};

const toggleLoginWindow = () => {
  const loginWindow = document.querySelector('.login'); // 로그인 창

  loginWindow.classList.toggle('login--show');
};

const toggleJoinWindow = (e) => {
  clearAuthInputs();

  if (e) {
    let currentBtn = e.target;
    let isBtnInLoginWindow = currentBtn.classList.contains('login__form__join-open-btn');

    if (isBtnInLoginWindow) toggleLoginWindow(); // join 버튼이 로그인 창 안에 있는 버튼이라면 로그인 창 닫기
  }

  const joinWindow = document.querySelector('.join'); // 회원가입 창

  joinWindow.classList.toggle('join--show');
};

const handleLoginClose = () => {
  clearAuthInputs();
  toggleLoginWindow();
};

const authToggleEventHandle = () => {
  if (!document.querySelector('.js-loginOpenBtn')) return;

  const loginOpenBtns = document.querySelectorAll('.js-loginOpenBtn'); // 로그인 열기 버튼
  const loginCloseBtn = document.querySelector('.login__form__close-btn'); // 로그인 닫기 버튼

  loginOpenBtns.forEach((loginOpenBtn) => {
    loginOpenBtn.addEventListener('click', handleLoginClose, false);
  });
  loginCloseBtn.addEventListener('click', handleLoginClose, false);

  const joinOpenBtns = document.querySelectorAll('.js-joinOpenBtn'); // 회원가입 열기 버튼
  const joinCloseBtn = document.querySelector('.join__form__close-btn'); // 회원가입 닫기 버튼

  joinOpenBtns.forEach((joinOpenBtn) => {
    joinOpenBtn.addEventListener('click', toggleJoinWindow, false);
  });
  joinCloseBtn.addEventListener('click', toggleJoinWindow, false);
};

export { toggleLoginWindow, toggleJoinWindow, authToggleEventHandle };
