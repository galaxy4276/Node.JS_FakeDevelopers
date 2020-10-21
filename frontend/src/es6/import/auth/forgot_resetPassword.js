/* --- */
/* -- 타입이 이메일인 input 요소 클릭시 label 포지션 변경 후 그 자리에 고정시키는 이벤트 --*/

let raised = false;

function raiseLabel(e) {
    function next(element) {
        // nextSibling 의 줄바꿈 요소(undifined 요소) 참조를 무시해주는 함수
        do {
            element = element.nextSibling;
        } while (element && element.nodeType !== 1);
        return element;
    }

    let input = e.target;
    let label = next(input); // input 뒤에 오는 label

    input.style["font-size"] = "1.5rem";
    label.style.top = "-1.5rem";
    label.style.left = "0";
    label.style["font-size"] = "0.9rem";
    label.style.opacity = "1";
    label.style.color = " #bebebe";

    raised = true;
}

window.onload = () => {
    const emailInputs = document.querySelectorAll(".js-emailInput");

    emailInputs.forEach((input) => {
        input.addEventListener("click", !raised ? raiseLabel : {}, {once: true});
        input.addEventListener("focus", !raised ? raiseLabel : {}, {once: true});
    });
}