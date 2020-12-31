import modal from '../../components/_modal';

const ckeckDelete = (e) => {
  e.preventDefault();

  const deletePost = () => {
    const deleteForm = document.querySelector('.post-view__footer__delete-form');

    deleteForm.submit();
  };

  modal(deletePost, '게시글을 삭제하시겠습니까?', '확인', '닫기');
};

export default ckeckDelete;
