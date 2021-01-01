class Overlay {
  constructor() {
    this.overlay = document.createElement('article');
    this.overlay.classList.add('loading');

    return this.overlay;
  }
}

class Svg {
  constructor() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.classList.add('loading__svg');

    this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    this.svg.append(this.rect);

    return this.svg;
  }
}

const timeSet = (s) => {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
};

const loading = {
  on: async function () {
    const DOMfragment = document.createDocumentFragment();

    const overlay = new Overlay();
    const svg = new Svg();

    overlay.append(svg);
    DOMfragment.append(overlay);

    await timeSet(0.3);

    document.body.append(DOMfragment);
  },

  off() {
    const loadingElem = document.querySelector('.loading');

    if (loadingElem) loadingElem.remove();
  },
};

export default loading;
