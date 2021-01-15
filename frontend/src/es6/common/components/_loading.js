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
  isExcuting: false,

  on: async function (waitTime = null) {
    // 입력한 초만큼 기다린 후 로딩 실행
    if (!!waitTime) {
      if (waitTime > this.maxWaitTime || typeof waitTime !== 'number') {
        throw new Error('loading.on 함수의 인자가 숫자가 아니거나 최대값을 초과했습니다.');
      }

      await timeSet(waitTime);
    }

    this.isExcuting = true;

    const DOMfragment = document.createDocumentFragment();

    const overlay = new Overlay();
    const svg = new Svg();

    overlay.append(svg);
    DOMfragment.append(overlay);

    document.body.append(DOMfragment);

    // 최대 대기시간 후에도 로딩이 꺼지지 않았다면 => 즉, off() 실행으로 isExcuting이 false가 되지 않았다면 로딩 삭제 자동 실행
    await timeSet(this.maxWaitTime);

    if (this.isExcuting === true) {
      console.warn('loading.off 가 호출되지 않아 로딩 컴포넌트가 자동 삭제처리 되었습니다.');
      this.deleteLoading();
    }
  },

  off() {
    const recursiveTimer = (s = this.minWaitTime) => {
      setTimeout(() => {
        const deleteDone = this.deleteLoading();
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

  deleteLoading() {
    const loadingElem = document.querySelector('.loading');

    if (!!loadingElem) {
      loadingElem.remove();
      this.isExcuting = false;

      return true;
    } //
    else {
      return false;
    }
  },
};

export default loading;
