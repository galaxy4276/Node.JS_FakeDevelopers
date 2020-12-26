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
    return number + 'bytes';
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB';
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + 'MB';
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

const cntFile = {
  on() {
    this.cntFile.textContent = '아직 업로드된 이미지가 없습니다.';
  },
  off() {
    this.cntFile.textContent = '';
  },
};

const setFileCnt = (num) => {
  const fileCnt = postWrite.querySelector('.post-write__file__cnt');

  if (num < 0 || !Number.isInteger(num)) return;
  if (num === 0) fileCnt.textContent = '아직 업로드된 이미지가 없습니다.';
  if (num > 0) fileCnt.textContent = `현재 업로드된 파일 ${num}개`;
};

const updateFileList = () => {
  const curFiles = postWrite.querySelector('.post-write__file__input').files;
  const preview = postWrite.querySelector('.post-write__file__preview');

  console.log(curFiles);

  preview.textContent = '';

  if (curFiles.length !== 0) {
    btnWrapperPos.initial();
    setFileCnt(curFiles.length);

    for (const file of curFiles) {
      const listItem = document.createElement('li');
      const txt = document.createElement('span');

      if (validFileType(file)) {
        txt.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;

        listItem.append(txt);
      } else {
        txt.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;

        listItem.append(txt);
      }

      preview.append(listItem);
    }
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
  input.addEventListener('change', updateFileList, false);
};

document.addEventListener('DOMContentLoaded', initPostWrite, false);
