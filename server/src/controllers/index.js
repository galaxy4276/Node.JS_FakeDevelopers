export const reqValidAndDefault = (data, defaultIdx) => { // 값이 존재하는 지 검증하고 데이터를 반환 ( 존재: 1, null || undefined: 2)
  return parseInt(data) >= 1 
          ? parseInt(data)
          : defaultIdx;
};
