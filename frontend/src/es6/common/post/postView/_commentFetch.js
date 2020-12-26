const commentFetch = (url, content) => {
  return fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    mode: process.env.NODE_ENV === 'development' ? 'cors' : 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ data: content }),
  }).then((res) => res.json());
};

export default commentFetch;
