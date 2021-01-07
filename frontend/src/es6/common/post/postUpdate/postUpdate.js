import ckeckBeforePageLoad from '../../function/_ckeckBeforePageLoad';
import refuseSubmitMsgs from './_refuseSubmitMsgs';

const hideRefuseMsgs = (e) => {
  if (refuseSubmitMsgs.isEmpty()) return;
  if (e.target.tagName === 'FORM') return;

  refuseSubmitMsgs.off();
};

const verifySubmitContentsEmpty = () => {
  const isNotBlank = (str) => /\S+/g.test(str);

  const title = document.body.querySelector('.post-update__title__input');
  const textarea = document.body.querySelector('.post-update__paragraph__input');
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

const submitPost = () => {
  const form = document.body.querySelector('.post-update__form');

  form.submit();
};

const handleSubmitBtnClick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  window.removeEventListener('beforeunload', ckeckBeforePageLoad, false);

  refuseSubmitMsgs.off();

  const isNotEmptyContents = verifySubmitContentsEmpty();

  if (!isNotEmptyContents) {
    refuseSubmitMsgs.on();
    return;
  }

  submitPost();
};

const handleSubmit = (e) => {
  const submit = document.querySelector('.post-update__submit__btn');

  submit.disabled = true; // 한 번 제출하면 버튼 비활성화
};

const initpostUpdate = () => {
  // submit 버튼 여러번 클릭 제한
  const form = document.querySelector('.post-update__form');
  form.addEventListener('submit', handleSubmit, false);

  // 빈 제목, 빈 내용일때 submit 거부
  // SubmitBtn은 button(type="button") 형식의 엘리먼트로, 그 자체로 submit 이벤트를 가지고 있진 않습니다.
  // 폼 제출은 별도로 선언되어 있는 submitPost() 에 의해 관리됩니다.
  const submitBtn = document.body.querySelector('.post-update__submit__btn');
  submitBtn.addEventListener('click', handleSubmitBtnClick, false);

  // 위에서 submit이 거부되었다면 나타났을 refuse 메세지를, form 클릭시 다시 안보이게 합니다.
  form.addEventListener('click', hideRefuseMsgs, false);

  // 다른 페이지로 이동하려 할때 다시 한 번 확인하기
  window.addEventListener('beforeunload', ckeckBeforePageLoad, false);
};

document.addEventListener('DOMContentLoaded', initpostUpdate, false);
