# 판다마켓

중고거래 플랫폼  
배포: [https://sprint.boolean.kr/](https://sprint.boolean.kr/){:target="_blank"}

---

## 개요
스프린트 21기 프론트엔드 미션.  
HTML/CSS로 구성된 정적 중고거래 플랫폼 **“판다마켓”** 제작.

---

## 파일 구조

```
assets/
  css/
    - reset.css      Meyer's Reset
    - font.css       ROKAFSans 폰트
    - style.css      메인 스타일
  fonts/             ROKAFSans woff
  img/               이미지
  js/
    - script.js      (현재 비어 있음)

index.html           완성
items.html           빈 템플릿
login.html           빈 템플릿
faq.html             빈 템플릿
privacy.html         빈 템플릿
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
--side-space: clamp(20px, 10vw, 200px)
--max-width: 1920px
--color-primary: #3692FF
--color-hero-bg: #CFE5FF
--color-footer-bg: #111827
```

- clamp()로 거의 모든 사이즈 제어  
- 미디어쿼리 없음  
- 폰트: Pretendard Variable (CDN) + ROKAFSans (로고)  
- 레이아웃: grid + flexbox  
- container로 1920px 제한  

---

## 현재 상태
- **완성:** index.html  
- **미완:** items, login, faq, privacy  
- **JS:** 없음  

---

## TODO

- [ ] `items.html`: 상품 리스트 페이지 구성  
- [ ] `login.html`: 로그인 폼 구현  
- [ ] `faq.html`: 자주 묻는 질문 콘텐츠 작성  
- [ ] `privacy.html`: 개인정보처리방침 콘텐츠 작성  
- [ ] **미디어쿼리를 이용한 반응형 처리**  
  (1920px 이하 구간에서 폰트, 간격, 이미지 비율 조정)

---

## 체크리스트

### [기본]
- [ ] 랜딩 페이지의 url path는 루트('/')로 설정합니다.  
- [ ] title은 **"판다마켓"** 으로 설정합니다.  
- [ ] 화면 너비가 **1920px 이상**일 때, 하늘색 배경은 가득 채우되 내부 요소의 위치는 고정되고 여백만 커집니다.  
- [ ] 화면 너비가 **1920px 미만**일 때,  
  - "판다마켓" 로고의 왼쪽 여백은 `200px`,  
  - "로그인" 버튼의 오른쪽 여백은 `200px` 유지,  
  - 화면이 줄어들수록 두 요소 간 거리가 점진적으로 좁아집니다.  
- [ ] 클릭 가능한 요소에는 `cursor: pointer`를 설정합니다.  
- [ ] "판다마켓" 클릭 시 루트 페이지(`/`)로 이동합니다.  
- [ ] "로그인" 버튼 클릭 시 로그인 페이지(`/login`)로 이동합니다. (빈 페이지)  
- [ ] "구경하러가기" 버튼 클릭 시 `/items`로 이동합니다. (빈 페이지)  
- [ ] "Privacy Policy", "FAQ" 클릭 시 각각 `/privacy`, `/faq`로 이동합니다. (빈 페이지)  
- [ ] 페이스북, 트위터, 유튜브, 인스타그램 아이콘 클릭 시 각 SNS 홈페이지가 **새 창에서** 열립니다.

### [심화]
- [ ] 브라우저 크기에 따라 페이지의 **요소 간 간격, 크기, 폰트 크기 등 모든 크기 관련 값이 유동적으로 변하도록** 설정합니다.
