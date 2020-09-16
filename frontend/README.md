### This Project is updating...

### 여기서 작업 리스트 업데이트

---

# example

=====

## 200808 frontend

- 로그인폼 소셜 로고와 소셜 텍스트 배치를 보기 좋게 수정하였습니다.
  - backend 에서 수정 사항
  * webpack 이 이미지 파일을 처리 후 바이너리가 깨지던 현상을 해결했습니다.
  * img 소스파일은 public/img 디렉터리에 생성됩니다.
  * 프론트 화면에서 이미지가 깨지던 문제를 해결하였습니다.

## 200810 backend

### 변경사항

    - 데이터베이스 환경설정파일과 설정파일을 모두 리모델링하였습니다.
      1. cheerupJun/src/config/config.json --> cheerupJun/src/models/config.js
      2. config 파일 삭제 ( 디렉터리 구조 복잡도 줄임 )
      3. models/index.js 코드 가독성을 높였습니다.
      4. 에러 처리 미들웨어를 app.js에 추가하였습니다.
        => 잘못된 url을 클라이언트에서 접근할 시 에러처리 미들웨어를 통해서 오류 또는 경고 페이지를 표시할 수 있게 되었습니다.

### 버그 또는 이슈 해결

    - warning: please use IANA standard timezone format ('Etc/GMT0') 이슈를 해결하였습니다.
      => npm run dev:server 더 이상 경고문이 보이지 않습니다.
