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

const updateImageDisplay = () => {
  const input = postWrite.querySelector('.post-write__file__input');
  const preview = postWrite.querySelector('.post-write__file__preview');
  const btn = postWrite.querySelector('.post-write__file__label');

  preview.textContent = '';
  btn.style.display = 'none';
  // TODO: 업로드한 파일 삭제 기능 추가
  // TODO: 파일 재업로드 기능 추가

  const curFiles = input.files;

  if (curFiles.length === 0) {
    const txt = document.createElement('span');

    txt.classList.add('post-write__file__preview-txt');
    txt.textContent = '아직 업로드된 이미지가 없습니다.';

    preview.appendChild(txt);
  } else {
    const list = document.createElement('ol');

    preview.appendChild(list);

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

      list.append(listItem);
    }
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

  // file 업로드시에 fileList 활성화
  const input = postWrite.querySelector('.post-write__file__input');
  input.addEventListener('change', updateImageDisplay, false);
};

document.addEventListener('DOMContentLoaded', initPostWrite, false);
