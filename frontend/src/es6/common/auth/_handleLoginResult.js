import modal from '../components/_modal';
import { loginWindow } from './_authToggleEventHandle';
import emojiListForLogin from './_emojiListForLogin';

/* --- */
/* -- 로그인 성공, 실패에 따른 이벤트 분기 --*/
const handleLoginSuccess = () => {
  const randomNum = Math.ceil(Math.random() * emojiListForLogin.length);
  const randomEmoji = emojiListForLogin[randomNum];

  modal(null, `${randomEmoji}\nprintf("안녕하세요 !");`);
};

const handleLoginFailure = () => {
  loginWindow.on();
  modal(null, '⚠\n가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
};

const handleLoginResult = () => {
  const loginResult = document.body.querySelector('.login-result');

  if (!loginResult) return; // 로그인 시도를 하지 않았다면 return

  // result is 'success' or 'failure'
  const result = loginResult.dataset.loginResult;

  if (result === 'success') handleLoginSuccess();
  else if (result === 'failure') handleLoginFailure();
};

export default handleLoginResult;
