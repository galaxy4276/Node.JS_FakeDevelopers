import onFormLabelsRaiseUp from '../../common/function/_onFormLabelsRaiseUp';
import FormVerification from '../../common/auth/_FormVerification';

const backToIndex = () => {
  location.href = '/';
};

const onVerifiction = (form) => {
  const verification = new FormVerification(form);

  verification.on();
};

const initForgetPage = () => {
  const findForm = document.querySelector('.find__form');

  onFormLabelsRaiseUp(findForm);
  onVerifiction(findForm);

  const closeBtn = document.querySelector('.find__form__close-btn');
  closeBtn.addEventListener('click', backToIndex, false);
};

document.addEventListener('DOMContentLoaded', initForgetPage, false);
