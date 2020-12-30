import { appState }  from '../';

const setUrl = (url, isRoot = false) => {
  console.log(`setUrl: ${url}`);

  if (isRoot)
    return appState.url = '/';
  return appState.url = url.match(/\/\w+\/\w+/)?.join();
}

export const setUrlPost = url => {
  console.log(`setUrl: ${url}`);
  return appState.url = url.match(/\/\w+\/\w+\/[0-9]+/)?.join();
}

export default setUrl;
