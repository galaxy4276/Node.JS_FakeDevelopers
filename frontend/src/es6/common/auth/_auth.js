import initLogoutBtnsHref from './_initLogoutBtnsHref';
import authToggleEventHandle from './_authToggleEventHandle';
import handleLoginResultQuery from './_handleLoginResultQuery';
import onFormLabelsRaiseUp from '../function/_onFormLabelsRaiseUp';

// TODO: input 두개 다 valid 일 때 (텍스트가 있을 때) 버튼 필터 제거

window.onload = () => {
  const joinForm = document.querySelector('.join__form');

  onFormLabelsRaiseUp(joinForm);
  initLogoutBtnsHref();
  authToggleEventHandle();
  handleLoginResultQuery();
};
