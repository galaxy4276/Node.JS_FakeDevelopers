const btnWrapper = {
  elem: document.body.querySelector('.post-write__file__btn-wrapper'),

  leftTop() {
    this.elem.style.position = 'initial';
    this.elem.style.top = 'initial';
    this.elem.style.left = 'initial';
    this.elem.style.transform = 'initial';
    this.elem.style.alignItems = 'flex-end';
  },

  center() {
    this.elem.style.position = 'absolute';
    this.elem.style.top = '50%';
    this.elem.style.left = '50%';
    this.elem.style.transform = 'translate(-50%, -50%)';
    this.elem.style.alignItems = 'center';
  },
};

const btn = {
  elem: document.body.querySelector('.post-write__file__label'),

  text(str) {
    this.elem.textContent = str;
  },
};

const fileCnt = {
  elem: document.body.querySelector('.post-write__file__cnt'),

  on(str) {
    this.elem.textContent = str;
    this.elem.style.display = 'inline';
  },

  off() {
    this.elem.style.display = 'none';
  },
};

const fileSize = {
  elem: document.body.querySelector('.post-write__file__entire-size'),

  on(str) {
    this.elem.textContent = str;
    this.elem.style.display = 'inline';
  },

  off() {
    this.elem.style.display = 'none';
  },
};

const warnMsg = {
  elem: document.body.querySelector('.post-write__file__warn-msg'),

  on(str) {
    this.elem.textContent = str;
    this.elem.style.display = 'inline';
  },

  off() {
    this.elem.style.display = 'none';
  },
};

export { btnWrapper, btn, fileCnt, fileSize, warnMsg };
