// https://www.ddccomputer.club/[게시판 이름]/api/create-bulk?count=60
const allPath = {
  intro: ['info', 'member', 'env', 'club'],
  milestone: ['curriculum', 'cert', 'career'],
  community: ['board', 'suggestion', 'donation', 'notice'],
  footprint: ['acquisition', 'awards', 'portfolio'],
};

const makeURLs = (path) => {
  const allURL = [];

  for (const category in path) {
    const boards = path[category];

    const urls = boards.map(
      (board) => `http://localhost:8001/${category}/${board}/api/create-bulk?count=320`
    );

    allURL.push(urls);
  }

  return allURL.flat();
};

const createBulk = () => {
  const requestURLs = makeURLs(allPath);

  requestURLs.forEach((url) => {
    fetch(url)
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  });
};

export default createBulk;

// 번들링 과정에 포함 되는 아무 js 파일에서나 호출해서 실행하세요
