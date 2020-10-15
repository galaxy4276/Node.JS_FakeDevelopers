// TODO: input 두개 다 valid 일 때 (텍스트가 있을 때) 버튼 필터 제거
// TODO: 컴포넌트 클릭 시에 타이틀 색 변화 고정
// TODO: X 버튼 누르면 로그인 화면 꺼지도록 설정
// TODO: 로그인 화면 눌렀을 때에서야 로그인 관련 스크립트 태그를 다운로드 하도록 설정 (미리 하지 말기)

/* --- */
/* 로그인, 회원가입 창 열고닫기  */

const loginOpenBtns = document.querySelectorAll(".js-loginOpenBtn"); // 로그인 열기 버튼
const loginCloseBtn = document.querySelector(".login__form__close-btn"); // 로그인 닫기 버튼
const loginWindow = document.querySelector(".login"); // 로그인 창

const joinOpenBtns = document.querySelectorAll(".js-joinOpenBtn"); // 회원가입 열기 버튼
const joinCloseBtn = document.querySelector(".join__form__close-btn"); // 회원가입 닫기 버튼
const joinWindow = document.querySelector(".join"); // 회원가입 창

function toggleAuthWindow(e){
    console.log(e.target);
    // loginWindow.classList.toggle("login--show");
    // joinWindow.classList.toggle("join--show");
}

function authToggleEventHandle() {
    loginOpenBtns.forEach((loginOpenBtn) => {
        loginOpenBtn.addEventListener("click", toggleAuthWindow);
    });
    loginCloseBtn.addEventListener("click", toggleAuthWindow);

    joinOpenBtns.forEach((joinOpenBtn) => {
        joinOpenBtn.addEventListener("click", toggleAuthWindow);
    });
    joinCloseBtn.addEventListener("click", toggleAuthWindow);
}

authToggleEventHandle();