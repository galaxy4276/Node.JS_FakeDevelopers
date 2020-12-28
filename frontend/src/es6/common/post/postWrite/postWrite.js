import isValidFileType from './_vaildFileTypes';
import { btnWrapper, btn, fileCnt, fileSize, warnMsg } from './_movableNodeStyles';

const returnFileSize = (num) => {
  if (num < 1024) {
    return num + ' bytes';
  } else if (num >= 1024 && num < 1048576) {
    return (num / 1024).toFixed(1) + ' KB';
  } else if (num >= 1048576) {
    return (num / 1048576).toFixed(1) + ' MB';
  }
};

const updatefileList = (files, parentListNode) => {
  if (parentListNode.tagName !== 'OL' && parentListNode.tagName !== 'UL') {
    console.warn('updatefileList 함수의 인자로 OL 또는 UL 엘리먼트가 와야 합니다.');
    return;
  }

  const DOMfragment = document.createDocumentFragment();

  const header = document.createElement('div');
  header.classList.add('post-write__file__header');

  header.innerHTML = `
<span>파일 이름</span>
<span>파일 용량</span>
`.trim();

  DOMfragment.append(header);

  for (const file of files) {
    const listItem = document.createElement('li');
    listItem.classList.add('post-write__file__item');

    const isPermitedFile = isValidFileType(file);

    listItem.innerHTML = isPermitedFile
      ? `
<span>${file.name}</span>
<span>${returnFileSize(file.size)}</span>
`.trim()
      : `
<span style="color: tomato;">${file.name}은(는) 허용되지 않는 파일 유형입니다.</span>
<span style="color: tomato;">Not Vaild</span>
`.trim();

    if (!isPermitedFile) warnMsg.on('Not Vaild');

    DOMfragment.append(listItem);
  }

  parentListNode.append(DOMfragment);
};

const bytesToMegaBytes = (bytes) => {
  return (bytes / 1048576).toFixed(1) + 'MB';
};

const setFileSize = (files) => {
  if (!files) {
    fileSize.off();
    return;
  }

  const limit = 10485760;
  const totalBytes = Array.from(files).reduce((acc, file) => acc + file.size, 0);
  const totalMB = bytesToMegaBytes(totalBytes);

  if (totalBytes > limit) {
    warnMsg.on(`${totalMB}/10MB ⛔ 최대 10MB까지만 업로드 가능합니다.`);
    return;
  }

  fileSize.on(`${totalMB}/10MB`);
};

const setFileCnt = (num) => {
  if (num < 0 || !Number.isInteger(num)) return;

  fileCnt.on(`현재 업로드된 파일 ${num}개`);
};

const toFileListStyle = (files) => {
  btnWrapper.leftTop();
  btn.text('이미지 다시 선택하기');
  setFileCnt(files.length);
  setFileSize(files);
};

const toInitStyle = () => {
  btnWrapper.center();
  btn.text('이미지 첨부');
  fileCnt.on('아직 업로드된 이미지가 없습니다.');
};

const vacateFileInfos = () => {
  const fileList = document.body.querySelector('.post-write__file__list');

  fileList.textContent = '';
  warnMsg.off();
  fileSize.off();
  fileCnt.off();
};

const handleFileChange = () => {
  vacateFileInfos();

  const fileList = document.body.querySelector('.post-write__file__list');

  const currFiles = document.body.querySelector('.post-write__file__input').files;
  const isFile = currFiles.length === 0 ? false : true;

  if (isFile) {
    toFileListStyle(currFiles);

    updatefileList(currFiles, fileList);
  } else {
    toInitStyle();
  }
};

const handleSubmit = (e) => {
  const submit = document.body.querySelector('.post-write__submit__btn');

  submit.disabled = true; // 한 번 제출하면 버튼 비활성화
};

const initPostWrite = () => {
  // submit 버튼 여러번 클릭 제한
  const form = document.body.querySelector('.post-write__form');
  form.addEventListener('submit', handleSubmit, false);

  // file 업로드시에 fileList 업데이트
  const input = document.body.querySelector('.post-write__file__input');
  input.addEventListener('change', handleFileChange, false);
};

document.addEventListener('DOMContentLoaded', initPostWrite, false);
