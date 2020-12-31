class Overlay {
  constructor() {
    this.overlay = document.createElement('article');
    this.overlay.classList.add('modal__overlay');

    return this.overlay;
  }
}

class Box {
  constructor() {
    this.box = document.createElement('div');
    this.box.classList.add('modal__box');

    return this.box;
  }
}

class Wrapper {
  constructor(className = '') {
    this.wrapper = document.createElement('section');
    this.wrapper.classList.add('modal__wrapper');

    if (className) this.wrapper.classList.add(className);

    return this.wrapper;
  }
}

class Message {
  constructor(str) {
    if (String(str).includes('\n')) {
      const sentences = str.match(/(^.*(?=\n)|(?<=\n).*$)/gm);

      const para = sentences.reduce((acc, sentence) => {
        const elem = document.createElement('p');
        elem.textContent = sentence;
        elem.classList.add('modal__msg');

        if (sentence === '⚠') {
          elem.classList.add('modal__warn-icon');
        }

        acc.append(elem);

        return acc;
      }, document.createDocumentFragment());

      return para;
    } else {
      const sentence = document.createElement('p');
      sentence.textContent = str;
      sentence.classList.add('modal__msg');

      return sentence;
    }
  }
}

class Btn {
  constructor(str) {
    this.btn = document.createElement('button');
    this.btn.textContent = str;
    this.btn.classList.add('modal__btn');

    return this.btn;
  }
}

const createElems = (message, btnText = '확인', isSecondBtn = false, secondBtnText = '닫기') => {
  return new Promise((resolve) => {
    const DOMfragment = document.createDocumentFragment();

    const overlay = new Overlay();
    const box = new Box();
    const msgWrapper = new Wrapper('js-msgWrapper');
    const btnWrapper = new Wrapper('js-btnWrapper');
    const msg = new Message(message);
    const btn = new Btn(btnText);

    msgWrapper.append(msg);
    btnWrapper.append(btn);

    if (isSecondBtn) {
      const secondBtn = new Btn(secondBtnText);
      btnWrapper.append(secondBtn);
    }

    box.append(msgWrapper, btnWrapper);
    overlay.append(box);
    DOMfragment.append(overlay);

    const emptyDOMfragment = document.body.appendChild(DOMfragment);

    if (emptyDOMfragment) resolve();
  });
};

const closeModal = () => {
  const modal = document.body.querySelector('.modal__overlay');

  document.body.removeChild(modal);
};

const createModal = async (callbackFn, ...createOptions) => {
  // 받는 인자는 (callbackFn, message, btnText = '확인', isSecondBtn = false, secondBtnText = '거부') 입니다.
  await createElems(...createOptions);

  const useSecondBtn = createOptions[2];
  const btnWrapper = document.body.querySelector('.js-btnWrapper');

  if (useSecondBtn) {
    btnWrapper.firstChild.addEventListener('click', callbackFn, false);
    btnWrapper.lastChild.addEventListener('click', closeModal, false);
  } else {
    btnWrapper.firstChild.addEventListener('click', closeModal, false);
  }
};

export default createModal;
