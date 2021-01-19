import onFormLabelsRaiseUp from '../../common/function/_onFormLabelsRaiseUp';
import FormVerification from '../../common/auth/_FormVerification';

const initForgetPage = () => {
  const findForm = document.querySelector('.find__form');

  onFormLabelsRaiseUp(findForm);

  const verification = new FormVerification(findForm);
  verification.on();
};

document.addEventListener('DOMContentLoaded', initForgetPage, false);
