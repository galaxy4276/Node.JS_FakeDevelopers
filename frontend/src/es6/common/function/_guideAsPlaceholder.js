const guideAsPlaceholder = (node, string) => {
  if (!node.placeholder) {
    console.warn('guideAsPlaceholder함수는 placeholder가 있는 node에만 사용 가능합니다.');
    return;
  }

  node.placeholder = string;
};

export default guideAsPlaceholder;
