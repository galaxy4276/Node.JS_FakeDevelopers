const inputVerification = {
  login: {
    elem: document.querySelector('.login'),

    on() {
      if (!this.elem) return;
    },

    off() {
      if (!this.elem) return;
    },
  },

  join: {
    elem: document.querySelector('.join'),

    on() {
      if (!this.elem) return;
    },

    off() {
      if (!this.elem) return;
    },
  },
};

export default inputVerification;
