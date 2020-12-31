import createModal from '../templates/_modal';
import { toggleloginWindow } from './_authToggleEventHandle';
/* --- */
/* -- 로그인 성공, 실패에 따른 이벤트 분기 --*/
// const handleLoginSuccess = () => {
// };

const handleLoginFailure = () => {
  toggleloginWindow();
  createModal(null, '⚠\n가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.', '확인');
};

const handleLoginResult = () => {
  const loginResult = document.body.querySelector('.login-result');

  if (!loginResult) return; // 로그인 시도를 하지 않았다면 return

  // result is 'loginSuccess' or 'loginFailure'
  const result = loginResult.dataset.dataLoginResult;

  if (result === 'loginFailure') handleLoginFailure();
};

export default handleLoginResult;
