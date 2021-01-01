const refuseSubmitMsgs = {
  elem: document.body.querySelector('.post-update__submit__refuse-msg-list'),
  items: document.createDocumentFragment(),

  on() {
    this.elem.append(this.items);
    this.elem.style.display = 'flex';
  },

  off() {
    this.elem.textContent = '';
    this.elem.style.display = 'none';
    this.items.textContent = '';
  },

  add(str) {
    const item = document.createElement('li');
    item.classList.add('post-update__submit__refuse-msg-item');
    item.textContent = str;

    this.items.append(item);
  },

  isEmpty() {
    return this.elem.textContent === '';
  },
};

export default refuseSubmitMsgs;
