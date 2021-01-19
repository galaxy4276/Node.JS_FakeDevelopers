export default class FormVerification {
  constructor(form) {
    this.form = form;
    this.inputs = Array.from(form.querySelectorAll('input'));
    this.checkIcons = Array.from(form.querySelectorAll('span.js-inputCheck'));
    this.regExps = {
      // input 태그에 부여된 name으로 구분합니다.
      // id: 영문 4자 이상 10자 이하
      id: /[a-zA-Z]{4,10}/,
      // password: 영문, 숫자, 기호를 조합하여 8자 이상
      password: /^(?=.*\d{1,50})(?=.*[!#$%&*+,-./:;<=>?@＼^_`(){|}~\"\'\[\]\\]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/,
      newPw: /^(?=.*\d{1,50})(?=.*[!#$%&*+,-./:;<=>?@＼^_`(){|}~\"\'\[\]\\]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/,
      // email: ____ @ ____ . ____  형식
      email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      // hash: ____-____-____-____-____ 형식
      hash: /([a-z\d]+-){4}[a-z\d]+/,
    };
  }

  on() {
    this.form.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    this.form.addEventListener('submit', this.handleSubmit.bind(this), false);
  }

  off() {
    this.form.removeEventListener('keyup', this.handleKeyUp.bind(this), false);
    this.form.removeEventListener('submit', this.handleSubmit.bind(this), false);
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const isAllPass = this.hardCkeckAllPass();

    if (isAllPass) this.form.submit();
  }

  handleKeyUp(e) {
    const target = e.target;

    // input 엘리먼트가 아니라면 종료
    if (target.tagName !== 'INPUT') return;

    // 비밀번호 관련 input이라면
    const isJoinPw = target.name === 'password' || target.name === 'pwcheck';
    const isResetPw = target.name === 'newPw' || target.name === 'newPwCheck';
    // this.pwCkeck 실행
    if (isJoinPw || isResetPw) {
      this.pwCkeck();
    }

    this.ckeckValue(target);

    const isAllPass = this.simpleCkeckAllPass();
    const submit = this.form.querySelector('input[type=submit]');

    if (isAllPass) {
      submit.style.backgroundColor = '#149ab8';
      submit.style.textShadow = '0.02em 0.04em 0.2em rgba(0, 0, 0, 0.5)';
      submit.disabled = false;
    } else {
      submit.style.backgroundColor = '';
      submit.style.textShadow = '';
      submit.disabled = true;
    }
  }

  simpleCkeckAllPass() {
    // 저비용 하이리스크 검사
    const ckeckIcons = this.checkIcons.map((elem) => elem.textContent);

    return ckeckIcons.every((icon) => icon === '✓');
  }

  hardCkeckAllPass() {
    // 고비용 로우리스크 검사
    return this.inputs.every(this.ckeckValue, this) && this.simpleCkeckAllPass();
  }

  changeCkeckIcon(inputElem, type) {
    const ckeckIcon = inputElem.parentNode.querySelector('span');

    if (!!ckeckIcon === false) {
      console.warn('ckeckIcon 엘리먼트를 찾을 수 없습니다.');
      return false;
    }

    switch (type) {
      case true:
        ckeckIcon.textContent = '✓';
        ckeckIcon.style.color = '#149ab8';
        break;
      case false:
        ckeckIcon.textContent = 'X';
        ckeckIcon.style.color = 'tomato';
        break;
      case null:
        ckeckIcon.textContent = '';
        ckeckIcon.style.color = 'initial';
        break;
      default:
        console.warn('명시된 인자만을 사용해주세요');
        break;
    }
  }

  pwCkeck() {
    const pw =
      this.form.querySelector('input[name=password]') ||
      this.form.querySelector('input[name=newPw]');
    const pwCkeck =
      this.form.querySelector('input[name=pwcheck]') ||
      this.form.querySelector('input[name=newPwCheck]');

    if (pwCkeck.value === '') {
      this.changeCkeckIcon(pwCkeck, null);

      return;
    }

    if (pw.value === pwCkeck.value) {
      this.changeCkeckIcon(pwCkeck, true);
    } else {
      this.changeCkeckIcon(pwCkeck, false);
    }
  }

  ckeckValue(input) {
    const reg = this.regExps[input.name];

    // 정규식 검증 리스트에 포함되지 않는 요소라면 종료
    if (!!reg === false) {
      // pwckeck 엘리먼트일 경우에 다른 검증 이벤트를 통과할 수 있도록 true 반환
      return true;
    }

    // input 안의 값이 비었다면 ckeckIcon을 지우고 종료
    if (input.value === '') {
      this.changeCkeckIcon(input, null);

      return false;
    }

    // 입력값 정규식 검증
    const isPass = reg.test(input.value);

    if (isPass === true) {
      this.changeCkeckIcon(input, true);

      return true;
    } else {
      this.changeCkeckIcon(input, false);

      return false;
    }
  }
}
