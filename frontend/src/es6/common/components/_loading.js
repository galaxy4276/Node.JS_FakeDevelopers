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
    setTimeout(resolve, Number(s) * 1000);
  });
};

const loading = {
  minWaitTime: 0.3,
  maxWaitTime: 3,

  on: async function (waitTime = null) {
    // 입력한 초만큼 기다린 후 로딩 실행
    if (!!waitTime) {
      if (waitTime > this.maxWaitTime || typeof waitTime !== 'number') {
        throw new Error('loading.on 함수의 인자가 숫자가 아니거나 최대값을 초과했습니다.');
      }

      await timeSet(waitTime);
    }

    const DOMfragment = document.createDocumentFragment();

    const overlay = new Overlay();
    const svg = new Svg();

    overlay.append(svg);
    DOMfragment.append(overlay);

    document.body.append(DOMfragment);
  },

  off() {
    const deleteLoading = () => {
      const loadingElem = document.querySelector('.loading');

      if (!!loadingElem) {
        loadingElem.remove();

        return true;
      } //
      else {
        return false;
      }
    };

    const recursiveTimer = (s = this.minWaitTime) => {
      setTimeout(() => {
        const deleteDone = deleteLoading();

        if (deleteDone) {
          this.waitTimeCnt = 0;

          return;
        } //
        else {
          return this.off();
        }
      }, s * 1000);
    };

    recursiveTimer(0.25); // 입력한 초 간격으로 로딩 끄는 함수 호출
  },
};

export default loading;
