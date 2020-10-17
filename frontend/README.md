___
## 무료 폰트 사이트

#### Free icon sites :+1:

- [Material](https://material.io/)
- [Ionicons](https://ionicons.com/)
- [Remixicon](https://remixicon.com/)
- [Feathericons](https://feathericons.com/)
- [Heroicons](https://heroicons.dev/)

#### Unfree icon sites :+1:

- [Fontawesome](https://fontawesome.com/)

#### Google fonts :+1:

- [Google fonts](https://fonts.google.com/)

___
## 이미지 적용법

#### 1. 아이콘인 경우

- inline svg로 적용합니다.
   
_이렇게 하는 이유_
    1. 다양한 무료 폰트 사이트에서 원하는 모양의 아이콘 사용 가능합니다. (폰트 어썸의 무료 아이콘은 생각보다 굉장히 한정적)
    2. 스타일 지정이 자유롭고, 크기, 두께, 색깔 ,모양변화, 애니메이션 등의 적용 가능 (1번에서 원하는 폰트를 찾지 못했다면 비슷한 모양을 찾아 본인이 커스텀 가능)
    3. object svg로 적용하지 않는이유 : 할 줄 몰라서.
   
_svg 사용에 대한 이해를 돕는 사이트들_

- [생활코딩 SVG](https://opentutorials.org/course/2418/13666)
- [웹에서 SVG 사용하기](https://svgontheweb.com/ko/#preparation)
- [SVG 그래픽](https://a11y.gitbook.io/graphics-aria/svg-graphics)

#### 2. 그 외 이미지인 경우

1. 템플릿(pug)에선 img가 아닌 다른 박스요소로 지정한다 (div 등)
2. 스타일시트(scss) 에서 해당 박스의 스타일에 [ background-image: url("_이미지 파일의 상대경로_") ] 로 지정한다.

 _이렇게 하는 이유_
    1. __템플릿이 아닌 스타일 시트에서 이미지를 불러오는 이유__ : 이미지를 pug 원래 특정 파일을 웹팩에서 로드하려면  entry js에서 하나하나 호출해서 빌드에 포함시켜줘야 하는데, 이미지는 그렇게 하나하나 호출하지 않습니다. css-loader 가 파일을 읽다가 확장자가 이미지인 파일이 있다면 그 파일 처리를 file-loader 로 넘겨줘서 빌드하게 되는 방식이라, css-loader 에게 인식시켜줘야 하기 때문에 스타일 시트에서 이미지를 호출합니다.
    2. __img 태그를 안 쓰는 이유__ : img 태그를 쓰면 스타일 시트에서 [ content: url() ] 방식으로 이미지를 호출하는데, 해당 방식을 쓰면 이미지는 정상적으로 빌드 되지만 그외 다른 스타일 지정 요소 (이미지 크기 조정, 필터 적용 등) 가 전혀 먹히지 않습니다. 이유요? 모릅니다. ㅎㅎ.

___
## 할 일

#### bear TODO: 

> - [ ] 폰트 적용 확인과 기본 폰트(ex- apple 폰트)를 내장 폰트으로 설정할 것을 고려해보기
> - [X] 이미지 적용법 문서화 :sparkles:
> - [ ] 폰트 적용법 문서화 :sparkles:
> - [ ] sub-main 템플릿 background 에 가운데 텍스트 logo image로 변경
> - [ ] 게시글 작성 프론트 폼 작성 (백엔드 요구사항)
> - [ ] 로그인, 회원 가입 컴포넌트 텍스트가 입력되지 않았다면 오버레이 클릭시 닫기도록 구현
> - [X] 슬라이드 학습 (구현해보기)
> - [ ] 클린 웹팩 플러그인 추가하기
