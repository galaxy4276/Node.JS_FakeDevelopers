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
  waitTimeCnt: 0,

  on: async function (waitTime = null) {
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
      }
    };

    const timer = (s = this.minWaitTime) => {
      setTimeout(() => {
        // 재귀적 setTimeout으로 입력한 초 간격으로 삭제 판별 함수 반복 호출
        deleteLoading();

        return this.off();
      }, s * 1000);
    };

    this.waitTimeCnt += 0.3;
    if (this.waitTimeCnt > this.maxWaitTime) return;

    timer(0.3);
  },
};

export default loading;
