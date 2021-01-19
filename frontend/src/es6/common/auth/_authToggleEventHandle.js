import FormVerification from './_FormVerification';

const clearAuthInputs = () => {
  const inputs = document.querySelectorAll('.js-authInput');

  inputs.forEach((input) => (input.value = ''));
};

const loginWindow = {
  elem: document.querySelector('.login'),

  on() {
    this.elem.classList.add('login--show');
  },

  off() {
    clearAuthInputs();

    this.elem.classList.remove('login--show');
  },
};

const joinWindow = {
  elem: document.querySelector('.join'),

  on(e = false) {
    if (!!e && e.type === 'click') {
      this.removeLoginWidnow(e);
    }

    this.elem.classList.add('join--show');

    this.createVerification();
    this.verification.on();
  },

  off(e = false) {
    clearAuthInputs();

    if (!!e && e.type === 'click') {
      this.removeLoginWidnow(e);
    }

    this.elem.classList.remove('join--show');

    this.verification.off();
  },

  removeLoginWidnow(e) {
    let currentBtn = e.target;
    let isBtnInLoginWindow = currentBtn.classList.contains('login__form__join-open-btn');

    if (isBtnInLoginWindow) loginWindow.off(); // join 버튼이 로그인 창 안에 있는 버튼이라면 로그인 창 닫기
  },

  createVerification() {
    if (Boolean(this.verification)) return;

    const form = this.elem.querySelector('form');
    this.verification = new FormVerification(form);
  },
};

const authToggleEventHandle = () => {
  if (!document.querySelector('.js-loginOpenBtn')) return;

  const loginOpenBtns = document.querySelectorAll('.js-loginOpenBtn'); // 로그인 열기 버튼
  const loginCloseBtn = document.querySelector('.login__form__close-btn'); // 로그인 닫기 버튼

  loginOpenBtns.forEach((loginOpenBtn) => {
    loginOpenBtn.addEventListener('click', loginWindow.on.bind(loginWindow), false);
  });
  loginCloseBtn.addEventListener('click', loginWindow.off.bind(loginWindow), false);

  const joinOpenBtns = document.querySelectorAll('.js-joinOpenBtn'); // 회원가입 열기 버튼
  const joinCloseBtn = document.querySelector('.join__form__close-btn'); // 회원가입 닫기 버튼

  joinOpenBtns.forEach((joinOpenBtn) => {
    joinOpenBtn.addEventListener('click', joinWindow.on.bind(joinWindow), false);
  });
  joinCloseBtn.addEventListener('click', joinWindow.off.bind(joinWindow), false);
};

export { loginWindow, joinWindow, authToggleEventHandle };
