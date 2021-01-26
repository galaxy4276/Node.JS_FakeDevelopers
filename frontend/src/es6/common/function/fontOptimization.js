import FontFaceObserver from 'fontfaceobserver';

const fontOptimization = () => {
  const family = 'Noto Sans KR';
  const options = [{ weight: 400 }, { weight: 700 }];

  const observers = options.reduce((acc, option) => {
    const obs = new FontFaceObserver(family, option);
    acc.push(obs.load('한글'));

    return acc;
  }, []);

  Promise.all(observers)
    .then((_) => {
      document.body.classList.add('fonts-loaded');
    })
    .catch((err) => {
      console.warn('Some critical font are not available:', err);
    });
};

document.addEventListener('DOMContentLoaded', fontOptimization, false);
