import path from "path";

/* ---  프론트 경로   --- */
const frontUrl = path.resolve(__dirname, "public");

const FRONT_API = path.resolve(frontUrl, 'api');
const FRONT_VIEW = path.resolve(frontUrl, 'views');
const FRONT_CSS = path.resolve(frontUrl, 'css');
const FRONT_ES6 = path.resolve(frontUrl, 'es5');
const FRONT_IMG = path.resolve(frontUrl, 'img');  
const FRONT_FONT = path.resolve(frontUrl, 'font');


/* --- 전공 소개 카테고리   --- */
const INTRO = "/intro"; // 전공 소개 루트 URL
const INTRO_INFO = "/info"; // 컴퓨터정보학과란?
const INTRO_MEMBER = "/member"; // 구성원
const INTRO_ENV = "/env"; // 교육 환경
const INTRO_CONVENTION = "/convention"; // 산업체 협약
const INTRO_SOCIETY = "/society"; // 동아리

/* --- 학과 진로 카테고리   --- */
const MILESTONE = "/milestone"; // 학과 진로 루트 URL
const MILESTONE_INFO = "/info"; // 교육 목표
const MILESTONE_CERT = "/cert"; // 자격증  소개
const MILESTONE_SECURITY = "/security"; // 보안 진로
const MILESTONE_DEVELOP = "/develop"; // 개발 진로

/* --- 커뮤니티 카테고리   --- */
const COMMUNITY = "/community"; // 커뮤니티 루트 URL
const COMMUNITY_STORY = "/story"; // 학과 이야기
const COMMUNITY_JOB = "/job"; // 진로 설계
const COMMUNITY_WISH = "/wish"; // 바라는 점
const COMMUNITY_DONATION = "/donation"; // 나눔의 공간

/* --- 학생 자취록 카테고리   --- */
const ACHIVEMENT = "/achivement"; // 학생 자취록 루트 URL
const ACHIVEMENT_CERT = "/cert"; // 자격증 취득
const ACHIVEMENT_CONTEST = "/contest"; // 대회 수상
const ACHIVEMENT_PERSONAL = "/personal-work"; // 개인 모작
const ACHIVEMENT_PORTFOLIO = "/portfolio"; // 취업 포트폴리오

/* --- 시스템 경로  --- */

/* --- export routes  --- */
const routes = {
  frontAPI: FRONT_API,
  frontView: FRONT_VIEW,
  frontCss: FRONT_CSS,
  frontEs6: FRONT_ES6,
  frontImg: FRONT_IMG,
  frontFont: FRONT_FONT,

  intro: INTRO,
  introInfo: INTRO_INFO,
  introMember: INTRO_MEMBER,
  introEnv: INTRO_ENV,
  introConv: INTRO_CONVENTION,
  introSociety: INTRO_SOCIETY,

  mile: MILESTONE,
  mileInfo: MILESTONE_INFO,
  mileCert: MILESTONE_CERT,
  mileSec: MILESTONE_SECURITY,
  mileDev: MILESTONE_DEVELOP,

  comm: COMMUNITY,
  commStory: COMMUNITY_STORY,
  commJob: COMMUNITY_JOB,
  commWish: COMMUNITY_WISH,
  commDonate: COMMUNITY_DONATION,

  achive: ACHIVEMENT,
  achiveCert: ACHIVEMENT_CERT,
  achiveContest: ACHIVEMENT_CONTEST,
  achivePersonal: ACHIVEMENT_PERSONAL,
  achivePortfol: ACHIVEMENT_PORTFOLIO,
};

export default routes;
