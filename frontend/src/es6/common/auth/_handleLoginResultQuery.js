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

const handleLoginResultQuery = () => {
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

export default handleLoginResultQuery;
