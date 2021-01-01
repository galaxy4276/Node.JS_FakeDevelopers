class Overlay {
  constructor() {
    this.overlay = document.createElement('article');
    this.overlay.classList.add('modal');

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

      const paras = sentences.reduce((acc, sentence) => {
        const elem = document.createElement('p');
        elem.textContent = sentence;
        elem.classList.add('modal__msg');

        acc.push(elem);

        return acc;
      }, []);

      const firstPara = paras[0];
      // 첫 para 엘리먼트가 3글자 미만이라면 아이콘으로 취급
      if (firstPara.textContent.length < 3) {
        firstPara.classList.add('modal__icon');
      }

      return paras;
    } else {
      const sentence = document.createElement('p');
      sentence.textContent = str;
      sentence.classList.add('modal__msg');

      // 전개 연산자로 받기 위해 배열로 반환
      return [sentence];
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

const createElems = (message, firstBtnText = '확인', secondBtnText = false) => {
  return new Promise((resolve) => {
    const DOMfragment = document.createDocumentFragment();

    const overlay = new Overlay();
    const box = new Box();
    const msgWrapper = new Wrapper('js-msgWrapper');
    const btnWrapper = new Wrapper('js-btnWrapper');
    const msg = new Message(message);
    const btn = new Btn(firstBtnText);

    msgWrapper.append(...msg);
    btnWrapper.append(btn);

    if (secondBtnText) {
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
  const modalElem = document.body.querySelector('.modal');

  if (modalElem) modalElem.remove();
};

const modal = async (callbackFn = null, ...createOptions) => {
  // 받는 인자는 (callbackFn, message, btnText = '확인', secondBtnText = '닫기') 입니다.
  await createElems(...createOptions);

  const isSecondBtn = Boolean(createOptions[2]);
  const btnWrapper = document.body.querySelector('.js-btnWrapper');

  if (isSecondBtn) {
    if (!callbackFn) {
      throw new Error('버튼 두개 사용 시에 첫번째인자로 콜백함수가 필요합니다.');
    }
    btnWrapper.firstChild.addEventListener('click', callbackFn, false);
    btnWrapper.lastChild.addEventListener('click', closeModal, false);
  } else {
    btnWrapper.firstChild.addEventListener('click', closeModal, false);
  }
};

export default modal;
