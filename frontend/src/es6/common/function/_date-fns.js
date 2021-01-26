const addTime = (dateTime, hours) => {
  const oldTime = new Date(dateTime);
  const newTime = new Date();

  newTime.setTime(oldTime.getTime() + hours * 60 * 60 * 1000);

  return newTime;
};

const getTimeDiff = (dateTime) => {
  const oldTime = new Date(dateTime);
  const newTime = new Date();

  return newTime.getTime() - oldTime.getTime();
};

const yymmdd = (dateObj) => dateObj.toISOString().match(/^\d{4}-\d{2}-\d{2}(?=T)/)[0];

const hhmm = (dateObj) => dateObj.toISOString().match(/(?<=T)\d{2}:\d{2}(?=:\d{2})/)[0];

const mmdd = (dateObj) => {
  // [Date Object] => String 'mm-dd', example - '12-25'
  // Non-capture Elements
  return dateObj.toISOString().match(/(?<=^\d{2,4}-)\d+-\d+(?=T)/)[0];
};

const formatDistance = (ms) => {
  if (ms > 1000 * 60 * 60 * 24) return undefined;

  // [Date Object] => [formatted time distance], example - '10초 전', '2분 전', '5시간 전' etc..
  const distanceMsg = {
    hours(hDiff) {
      return `${hDiff}시간 전`;
    },
    minutes(mDiff) {
      return `${mDiff}분 전`;
    },
    seconds(sDiff) {
      return `${sDiff}초 전`;
    },
  };

  const ss = Math.floor((ms / 1000) % 60);
  const mm = Math.floor((ms / 1000 / 60) % 60);
  const hh = Math.floor(ms / 1000 / 60 / 60);

  // (1시간~23시간) 이전
  if (hh >= 1) {
    return distanceMsg.hours(hh);
  } // (1분 ~ 59분) 이전
  else if (mm >= 1) {
    return distanceMsg.minutes(mm);
  } // (1초 ~ 59초) 이전
  else if (ss >= 0) {
    return distanceMsg.seconds(ss);
  }
};

const processDateTime = (dateTime, diff) => {
  const todayKR = addTime(new Date(), 9); // 아래 mmdd 함수는 ISOString 기준(GMT)으로 시간을 가공하기 때문에, 한국 시간을 구하려면 +9

  const todayMMDD = mmdd(todayKR);
  const MMDD = mmdd(dateTime);

  const timeText = MMDD === todayMMDD ? formatDistance(diff) : MMDD;

  return timeText;
};

export { addTime, getTimeDiff, processDateTime, yymmdd, hhmm };
