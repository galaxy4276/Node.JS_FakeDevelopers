const postWrite = document.body.querySelector('.post-write');

// const verifyFiles = (files) => {
//   const isImage = (File) => /(?<=^image\/)(jpe?g|png|gif|svg\+xml)/i.test(File.type);

//   if (files.every(isImage)) {
//     upload(files);
//   } else {
//     alert('이미지 파일만 게시 가능합니다.');
//   }

//   //test
//   files.forEach((file, index) => {
//     console.log(`... file[${index}].name = ${file.name}`);
//   });
// };

const returnFileSize = (number) => {
  if (number < 1024) {
    return number + ' bytes';
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + ' KB';
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + ' MB';
  }
};

const fileTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];

const validFileType = (file) => fileTypes.includes(file.type);

const btnWrapperPos = {
  btnWrapper: postWrite.querySelector('.post-write__file__btn-wrapper'),
  btn: postWrite.querySelector('.post-write__file__label'),

  initial() {
    this.btn.textContent = '이미지 다시 선택하기';
    this.btnWrapper.style.position = 'initial';
    this.btnWrapper.style.top = 'initial';
    this.btnWrapper.style.left = 'initial';
    this.btnWrapper.style.transform = 'initial';
    this.btnWrapper.style.alignItems = 'flex-end';
  },
  center() {
    this.btn.textContent = '이미지 첨부';
    this.btnWrapper.style.position = 'absolute';
    this.btnWrapper.style.top = '50%';
    this.btnWrapper.style.left = '50%';
    this.btnWrapper.style.transform = 'translate(-50%, -50%)';
    this.btnWrapper.style.alignItems = 'center';
  },
};

const setFileCnt = (num) => {
  const fileCnt = postWrite.querySelector('.post-write__file__cnt');

  if (num < 0 || !Number.isInteger(num)) return;
  if (num === 0) fileCnt.textContent = '아직 업로드된 이미지가 없습니다.';
  if (num > 0) fileCnt.textContent = `현재 업로드된 파일 ${num}개`;
};

const updatefileList = (files, parentListNode) => {
  if (parentListNode.tagName !== 'OL' && parentListNode.tagName !== 'UL') {
    console.warn('updatefileList 함수의 인자로 OL 또는 UL 엘리먼트가 와야 합니다.');
    return;
  }

  // TODO: 파일 용량 검증하기 (10MB)

  const DOMfragment = document.createDocumentFragment();

  const header = document.createElement('div');
  header.classList.add('post-write__file__header');

  header.innerHTML = `
<span>파일 이름</span>
<span>파일 용량</span>
`.trim();

  DOMfragment.append(header);

  const _returnFileSize = returnFileSize;

  for (const file of files) {
    const listItem = document.createElement('li');
    listItem.classList.add('post-write__file__item');

    listItem.innerHTML = validFileType(file)
      ? `
<span>${file.name}</span>
<span>${_returnFileSize(file.size)}</span>
`.trim()
      : `
<span style="color: tomato;">${file.name}은(는) 허용되지 않는 파일 유형입니다.</span>
<span style="color: tomato;">Not Vaild</span>
`.trim();

    DOMfragment.append(listItem);
  }

  parentListNode.append(DOMfragment);
};

const handleFileChange = () => {
  const curFiles = postWrite.querySelector('.post-write__file__input').files;
  const fileList = postWrite.querySelector('.post-write__file__list');

  fileList.textContent = '';

  if (curFiles.length !== 0) {
    btnWrapperPos.initial();
    setFileCnt(curFiles.length);

    updatefileList(curFiles, fileList);
  } else {
    btnWrapperPos.center();
    setFileCnt(0);
  }
};

const handleSubmit = (e) => {
  const submit = postWrite.querySelector('.post-write__submit__btn');

  submit.disabled = true; // 한 번 제출하면 버튼 비활성화
};

const initPostWrite = () => {
  // submit 버튼 여러번 클릭 제한
  const form = postWrite.querySelector('.post-write__form');
  form.addEventListener('submit', handleSubmit, false);

  // file 업로드시에 fileList 업데이트
  const input = postWrite.querySelector('.post-write__file__input');
  input.addEventListener('change', handleFileChange, false);
};

document.addEventListener('DOMContentLoaded', initPostWrite, false);
