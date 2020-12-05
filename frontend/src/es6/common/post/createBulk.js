// https://www.ddccomputer.club/[게시판 이름]/api/create-bulk?count=60
// 위 API로 게시판에 가상 게시글 형성 가능
const allPath = {
  intro: ['info', 'member', 'env', 'club'],
  milestone: ['curriculum', 'cert', 'career'],
  community: ['board', 'suggestion', 'donation', 'notice'],
  footprint: ['acquisition', 'awards', 'portfolio'],
};

const currTestPath = {
  // 원한다면 이렇게 하나의 게시판만 넣을수도 있음
  community: ['board'],
};

const makeURLs = (path) => {
  const allURL = [];

  for (const category in path) {
    const boards = path[category];

    const randomNum = Math.floor(Math.random() * 300);

    const urls = boards.map(
      (board) => `http://localhost:8001/${category}/${board}/api/create-bulk?count=${randomNum}`
    );

    allURL.push(urls);
  }

  return allURL.flat();
};

const createBulk = () => {
  const requestURLs = makeURLs(currTestPath);

  requestURLs.forEach((url) => {
    fetch(url)
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  });
};

export default createBulk;

// 번들링 과정에 포함 되는 아무 js 파일에서나 호출해서 실행하세요
