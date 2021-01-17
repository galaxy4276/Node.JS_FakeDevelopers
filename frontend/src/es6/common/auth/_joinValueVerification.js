const form = document.querySelector('.join__form');

//TODO: 각 input.value에 대응하는 정규식 검증 기능 만들기

const verifyInputs = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const inputs = Array.from(form.querySelectorAll('.join__form__input'));
  const [name, pw, pwCheck, email] = inputs.map((input) => input.value);

  console.log(name, pw, pwCheck, email);
  console.warn('회원가입 입력값 검증기능 개발중');
};

const joinValueVerification = {
  on() {
    verifyInputs();

    form.addEventListener('submit', verifyInputs, false);
  },

  off() {
    form.removeEventListener('submit', verifyInputs, false);
  },
};

export default joinValueVerification;
