/* -- find 폼의 input 요소 클릭시 label 포지션 변경 후 그 자리에 고정시키는 이벤트 --*/

const findFormInputs = document.querySelectorAll(".find__form__input");


function next(element) {
    // nextSibling 의 줄바꿈 요소(undifined 요소) 참조를 무시해주는 함수
    do {
        element = element.nextSibling;
    } while (element && element.nodeType !== 1);
    return element;        
}

function raiseLabel(e) {
    let input = e.target;
    let label = next(input);

    input.style["font-size"] = "1.5rem";
    label.style.top = "-1.5rem";
    label.style.left = "0";
    label.style["font-size"] = "0.9rem";
    label.style.opacity = "1";
    label.style.color = " #bebebe";
}

function findFormInputEventHandle(){
    findFormInputs.forEach((findFormInput) => {
        findFormInput.addEventListener("click", raiseLabel, {once: true});
    });
}

findFormInputEventHandle();