const requestURL = {
  host: 'https://www.ddccomputer.club',
  localhost: 'http://localhost:8001',

  get url() {
    if (!this._path) {
      console.error('requestURL(): path를 설정해주세요');
      return;
    }
    return process.env.NODE_ENV === 'development'
      ? this.localhost + this._path
      : this.host + this._path;
  },

  set path(path) {
    this._path = path;
  },
};

export default requestURL;
