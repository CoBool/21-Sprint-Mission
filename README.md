# 판다마켓

중고거래 플랫폼  
배포: [https://sprint.boolean.kr/](https://sprint.boolean.kr/)
Github Pages: [https://cobool.github.io/21-Sprint-Mission/](https://cobool.github.io/21-Sprint-Mission/)


---

## 개요
스프린트 21기 프론트엔드 미션.  
HTML/CSS로 구성된 정적 중고거래 플랫폼 **“판다마켓”** 제작.

---

## 파일 구조

```
assets/
  css/
    - base.css       기본 스타일 (변수 등)
    - font.css       ROKAFSans 폰트
    - form.css       로그인/회원가입 폼 스타일
    - reset.css      Meyer's Reset
    - style.css      메인 스타일
  fonts/             ROKAFSans woff
  images/            이미지
    icons/           소셜 로그인 아이콘
  js/
    - script.js      주요 로직
  utility/
    - validation.js  폼 검증 로직

pages/
  - faq.html         FAQ 페이지
  - items.html       상품 리스트 페이지
  - login.html       로그인 페이지
  - privacy.html     개인정보처리방침 페이지
  - signup.html      회원가입 페이지

index.html           메인 랜딩 페이지
```

---

## HTML

### index.html

```
header - sticky 헤더, 로고 + 로그인
main
  - 배너 (히어로)
  - 기능 소개 3개 (Hot / Search / Register)
  - 배너
footer - 링크, SNS
```

- 배너는 grid로 텍스트/이미지 2컬럼 구성  
- 기능 카드 비율: 이미지 55%, 텍스트 45%  
- Search 섹션만 reverse 처리 (좌우 반전)

---

## CSS

### 변수

```css
--max-width: 1140px
--color-blue: #3692FF
--color-banner-bg: #CFE5FF
--color-footer-bg: #111827
--color-gray-50 ~ 900: 그레이 스케일
```

- CSS 변수로 색상 시스템 통일 관리
- Max-width 1140px 제한
- 폰트: Pretendard Variable (CDN) + ROKAFSans (로고, 폰트 파일)  
- 레이아웃: grid + flexbox
- Mobile First 접근 방식  

---

## 현재 상태
- **완성:** index.html, login.html, signup.html  
- **부분 완성:** items.html, faq.html, privacy.html (템플릿)  
- **JS:** 폼 검증 로직 구현 중

---

## TODO

- [x] `login.html`: 로그인 폼 구현
- [x] `signup.html`: 회원가입 폼 구현
- [ ] `items.html`: 상품 리스트 페이지 구성  
- [ ] `faq.html`: 자주 묻는 질문 콘텐츠 작성  
- [ ] `privacy.html`: 개인정보처리방침 콘텐츠 작성  
- [ ] 폼 검증 로직 완성
- [ ] **미디어쿼리를 이용한 반응형 처리**  
  (1920px 이하 구간에서 폰트, 간격, 이미지 비율 조정)

---

## 체크리스트

### [기본]
- [x] 랜딩 페이지의 url path는 루트('/')로 설정  
- [x] title은 **"판다마켓"** 으로 설정  
- [x] Global Navigation Bar가 sticky(최상단 고정) 처리  
- [x] Palette의 color 값을 CSS 변수로 등록하고 사용  
- [x] 클릭 가능한 요소에 `cursor: pointer` 설정  
- [x] "판다마켓" 클릭 시 루트 페이지(`/`)로 이동 및 새로고침  
- [x] "로그인" 버튼 클릭 시 로그인 페이지(`/login`)로 이동  
- [x] "회원 가입" 버튼 클릭 시 회원가입 페이지(`/signup`)로 이동  
- [x] "구경하러가기" 버튼 클릭 시 `/items`로 이동  
- [x] "Privacy Policy", "FAQ" 클릭 시 각각 `/privacy`, `/faq`로 이동  
- [x] SNS 아이콘(Google, Kakao, Facebook, Instagram, Twitter, YouTube) 클릭 시 각각의 페이지로 새 창 이동

### [로그인/회원가입]
- [x] 로그인 페이지, 회원가입 페이지 로고 위 상단 여백 동일  
- [x] 비밀번호 input 요소 오른쪽에 눈모양 아이콘 추가  
- [ ] 비밀번호 보기/숨기기 기능 구현 (예정)

### [반응형]
- [x] **반응형 디자인 적용 완료** (PC 1200px+, Tablet 768px~1199px, Mobile 375px~767px)  
  - PC/Tablet/Mobile 분기 처리  
  - "판다마켓" 로고와 "로그인" 버튼 간격 반응형 조정  
  - 요소 간 간격, 크기, 폰트 크기 등 유동적 변환

### [SEO/메타]
- [x] 메타 태그 설정 (제목: "판다 마켓", 설명: "일상의 모든 물건을 거래해보세요")

### [심화]
- [x] 브라우저 크기에 따라 모든 크기 관련 값이 유동적으로 변환
