/* --- */
/* -- input 요소 클릭시 label 포지션 변경 후 그 자리에 고정시키는 이벤트 --*/
const raiseLabel = (input) => {
  const next = (element) => {
    // nextSibling 의 줄바꿈 요소(undifined 요소) 참조를 무시해주는 함수
    do {
      element = element.nextSibling;
    } while (element && element.nodeType !== 1);
    return element;
  };

  let label = next(input); // input 뒤에 오는 label

  if (!label) return;
  if (label.style.color === '#bebebe') return;

  input.style.fontSize = '1.5rem';
  label.style.top = '-1.5rem';
  label.style.left = '0';
  label.style.fontSize = '0.9rem';
  label.style.opacity = '1';
  label.style.color = '#bebebe';
};

const handleLabelRaiseUp = (e) => {
  if (e.target.tagName !== 'INPUT') return;

  const input = e.target;

  raiseLabel(input);
};

const onFormLabelsRaiseUpEvent = (form) => {
  if (!form) return;

  form.addEventListener('click', handleLabelRaiseUp, false);
  form.addEventListener('focusin', handleLabelRaiseUp, false);
};

export default onFormLabelsRaiseUpEvent;
