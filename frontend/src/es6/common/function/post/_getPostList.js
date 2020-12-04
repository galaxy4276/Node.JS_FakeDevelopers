import processToElems from './_processToElems';

const getpostsData = (url = '') => {
  return fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    mode: process.env.NODE_ENV === 'development' ? 'no-cors' : 'same-origin',
    credentials: process.env.NODE_ENV === 'development' ? 'same-origin' : 'include', // 조회수 검증을 위한 쿠키 허용
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

const getPostList = (parentElem, boardName, limit = 15, page = 1) => {
  const requestURL = {
    protocol: 'https://',
    host: 'www.ddccomputer.club',

    get url() {
      return process.env.NODE_ENV === 'development'
        ? 'http://localhost:8001' + this.path
        : this.protocol + this.host + this.path;
    },

    set(_path) {
      this.path = _path;
    },
  };

  const path = `/${boardName}/api?limit=${limit}&page=${page}`;
  requestURL.set(path);

  // test
  const testLog = (res) => {
    console.log(`요청 API => ${path}`);
    console.log(res);

    if (res.postsList.length !== limit)
      console.warn(
        ' 쿼리문으로 요청한 데이터 수와 받아온 데이터 수가 다릅니다.\n',
        ' ▶ 마지막 페이지이거나 서버측 코드가 변경되었습니다.'
      );

    return res;
  };

  return getpostsData(requestURL.url)
    .then((res) => testLog(res) /* Just log => data not change */)
    .then((res) => processToElems(res.postsList))
    .then((DOMfragment) => parentElem.appendChild(DOMfragment))
    .catch(console.error);
};

export default getPostList;
