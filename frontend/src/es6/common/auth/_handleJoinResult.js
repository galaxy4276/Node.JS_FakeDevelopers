import modal from '../components/_modal';
import { joinWindow } from './_authToggleEventHandle';
/* --- */
/* -- 회원가입 성공, 실패에 따른 이벤트 분기 --*/
const handleJoinSuccess = () => {
  modal(null, '🎊\n환영합니다! 로그인하여 커뮤니티에 참여해보세요.');
};

const handleJoinFailure = () => {
  joinWindow.on();
  modal(null, '⚠\n이미 존재하는 회원입니다.');
};

const handleJoinResult = () => {
  const joinResult = document.body.querySelector('.join-result');

  if (!joinResult) return; // 회원가입 시도를 하지 않았다면 return

  // result is 'success' or 'failure'
  const result = joinResult.dataset.joinResult;

  if (result === 'success') handleJoinSuccess();
  else if (result === 'failure') handleJoinFailure();
};

export default handleJoinResult;
