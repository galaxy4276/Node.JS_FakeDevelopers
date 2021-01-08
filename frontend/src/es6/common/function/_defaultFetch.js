import loading from '../../common/components/_loading';

const defaultFetch = (url = '') => {
  return fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    mode: process.env.NODE_ENV === 'development' ? 'cors' : 'same-origin',
    credentials: process.env.NODE_ENV === 'development' ? 'same-origin' : 'include', // 조회수 검증을 위한 쿠키 허용
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      loading.off();
    });
};

export default defaultFetch;
