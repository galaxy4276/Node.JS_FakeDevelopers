// TODO: input 두개 다 valid 일 때 (텍스트가 있을 때) 버튼 필터 제거
// TODO: 컴포넌트 클릭 시에 타이틀 색 변화 고정
// TODO: X 버튼 누르면 로그인 화면 꺼지도록 설정
// TODO: 로그인 화면 눌렀을 때에서야 로그인 관련 스크립트 태그를 다운로드 하도록 설정 (미리 하지 말기)

const loginOpenBtns = document.querySelectorAll(".js-loginBtn"); // 로그인 열기 버튼
const loginCloseBtn = document.querySelector(".login__form__close-btn"); // 로그인 닫기 버튼
const loginWindow = document.querySelector(".login"); 

function toggleLoginWindow(){
    loginWindow.classList.toggle("login--show");
}

function init() {
    loginOpenBtns.forEach((loginOpenBtn) => {
        loginOpenBtn.addEventListener("click", toggleLoginWindow);
    });
    loginCloseBtn.addEventListener("click", toggleLoginWindow);
}

init();