import isValidFileType from './_vaildFileTypes';
import { btnWrapper, btn, fileCnt, fileSize, warnMsg, refuseSubmitMsgs } from './_changeableNodes';
import ckeckBeforePageLoad from '../../function/_ckeckBeforePageLoad';

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

    const isPermitedFileType = isValidFileType(file);

    listItem.innerHTML = isPermitedFileType
      ? `
<span>${file.name}</span>
<span>${returnFileSize(file.size)}</span>
`.trim()
      : `
<span style="color: tomato;">${file.name}은(는) 허용되지 않는 파일 유형입니다.</span>
<span style="color: tomato;">Not Vaild</span>
`.trim();

    if (!isPermitedFileType) warnMsg.on('⛔ 허용되지 않은 파일');

    DOMfragment.append(listItem);
  }

  parentListNode.append(DOMfragment);
};

const bytesToMegaBytes = (bytes) => {
  return (bytes / 1048576).toFixed(1) + 'MB';
};

const isVaildFileSize = (bytes) => {
  const limit = 10485760; // 10 MB => 10485760 bytes

  return limit >= bytes;
};

const getTotalBytes = (files) => Array.from(files).reduce((acc, file) => acc + file.size, 0);

const setFileSize = (files) => {
  if (!files) {
    fileSize.off();
    return;
  }

  const totalBytes = getTotalBytes(files);
  const totalMB = bytesToMegaBytes(totalBytes);

  if (!isVaildFileSize(totalBytes)) {
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

const hideRefuseMsgs = (e) => {
  if (refuseSubmitMsgs.isEmpty()) return;
  if (e.target.tagName === 'FORM') return;

  refuseSubmitMsgs.off();
};

const verifySubmitContentsEmpty = () => {
  const isNotBlank = (str) => /\S+/g.test(str);

  const title = document.body.querySelector('.post-write__title__input');
  const textarea = document.body.querySelector('.post-write__paragraph__input');
  const isTitle = isNotBlank(title.value);
  const isMainText = isNotBlank(textarea.value);

  if (!isTitle) {
    refuseSubmitMsgs.add('제목을 입력해주세요.');
  }

  if (!isMainText) {
    refuseSubmitMsgs.add('내용을 입력해주세요.');
  }

  return isTitle && isMainText;
};

const verifySubmitFiles = () => {
  const currFiles = document.body.querySelector('.post-write__file__input').files;

  const isValidSize = isVaildFileSize(getTotalBytes(currFiles));
  const isVaildType = Array.from(currFiles).every(isValidFileType);

  if (!isValidSize) {
    refuseSubmitMsgs.add('파일 용량은 10MB를 넘을 수 없습니다.');
  }

  if (!isVaildType) {
    refuseSubmitMsgs.add('이미지 파일만 첨부 가능합니다.');
  }

  return isValidSize && isVaildType;
};

const submitPost = () => {
  const form = document.body.querySelector('.post-write__form');

  form.submit();
};

const handleSubmitBtnClick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  window.removeEventListener('beforeunload', ckeckBeforePageLoad, false);

  refuseSubmitMsgs.off();

  const isNotEmptyContents = verifySubmitContentsEmpty();
  const isPermitedFiles = verifySubmitFiles();

  if (!isNotEmptyContents || !isPermitedFiles) {
    refuseSubmitMsgs.on();
    return;
  }

  submitPost();
};

const onDisabled = (elem) => {
  elem.disabled = false;
};

const handleSubmit = (e) => {
  const submit = document.body.querySelector('.post-write__submit__btn');

  onDisabled(submit);
};

const initPostWrite = () => {
  // file 업로드시에 fileList 업데이트
  const input = document.body.querySelector('.post-write__file__input');
  input.addEventListener('change', handleFileChange, false);

  // submit 버튼 여러번 클릭 제한
  const form = document.body.querySelector('.post-write__form');
  form.addEventListener('submit', handleSubmit, false);

  // 빈 제목, 빈 내용일때, 파일 확장자나 파일 크기가 허용되지 않는 크기일때 submit 거부
  // SubmitBtn은 button(type="button") 형식의 엘리먼트로, 그 자체로 submit 이벤트를 가지고 있진 않습니다.
  // 폼 제출은 별도로 선언되어 있는 submitPost() 에 의해 관리됩니다.
  const submitBtn = document.body.querySelector('.post-write__submit__btn');
  submitBtn.addEventListener('click', handleSubmitBtnClick, false);

  // 위에서 submit이 거부되었다면 나타났을 refuse 메세지를, form 클릭시 다시 안보이게 합니다.
  form.addEventListener('click', hideRefuseMsgs, false);

  // 다른 페이지로 이동하려 할때 다시 한 번 확인하기
  window.addEventListener('beforeunload', ckeckBeforePageLoad, false);
};

document.addEventListener('DOMContentLoaded', initPostWrite, false);
