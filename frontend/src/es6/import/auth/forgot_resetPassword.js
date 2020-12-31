import raiseLabel from '../../common/function/_raiseLabel.js';

window.onload = () => {
  const emailInputs = document.querySelectorAll('.js-emailInput');

  emailInputs.forEach((input) => {
    input.addEventListener('click', !raised ? raiseLabel : {}, { once: true });
    input.addEventListener('focus', !raised ? raiseLabel : {}, { once: true });
  });
};
