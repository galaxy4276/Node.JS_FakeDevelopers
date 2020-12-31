import initLogoutBtnsHref from './_initLogoutBtnsHref';
import authToggleEventHandle from './_authToggleEventHandle';
import handleLoginResultQuery from './_handleLoginResultQuery';
import raiseLabel from '../function/_raiseLabel';

// TODO: input 두개 다 valid 일 때 (텍스트가 있을 때) 버튼 필터 제거

window.onload = () => {
  const emailInputs = document.querySelectorAll('.js-emailInput');

  emailInputs.forEach((input) => {
    input.addEventListener('click', !raised ? raiseLabel : {}, { once: true });
    input.addEventListener('focus', !raised ? raiseLabel : {}, { once: true });
  });

  initLogoutBtnsHref();
  authToggleEventHandle();
  handleLoginResultQuery();
};
