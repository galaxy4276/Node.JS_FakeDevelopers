import path from 'path';


const frontUrl = '../../../frontend';

const FRONT_API = path.join(frontUrl, 'api');
const FRONT_VIEW = path.join(frontUrl, 'src', 'views');

const routes = {
  frontAPI: FRONT_API,
  frontView: FRONT_VIEW,
}

export default routes;