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
    - base.css         기본 스타일 (변수 등)
    - common.css       공통 컴포넌트 (container, sr-only)
    - font.css         ROKAFSans 폰트
    - form.css         로그인/회원가입 폼 스타일
    - reset.css        Meyer's Reset
    - style.css        메인 페이지 스타일
  fonts/               ROKAFSans woff
  images/              이미지
    icons/             소셜 로그인 아이콘
  js/
    - form.js          폼 진입 시 초기화 및 이벤트 연결
    - script.js        공통 스크립트 (비밀번호 토글 등)
  schemas/
    - login.js         로그인 폼 검증 스키마
    - signup.js        회원가입 폼 검증 스키마
  utility/
    - form-ui.js       폼 에러 메시지 UI 유틸리티
    - zod.js           경량 Zod 스타일 검증 라이브러리

pages/
  - faq.html           FAQ 페이지
  - items.html         상품 리스트 페이지
  - login.html         로그인 페이지
  - privacy.html       개인정보처리방침 페이지
  - signup.html        회원가입 페이지

index.html             메인 랜딩 페이지
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
- Hero 이미지는 CSS 배경으로 처리
- Features 이미지는 `<img>` 태그 사용

### login.html / signup.html

```
header - 폼 헤더, 로고
form
  - 이메일 입력
  - 비밀번호 입력 (토글 버튼 포함)
  - 간편 로그인
footer - 회원가입/로그인 링크
```

- 비밀번호 토글 버튼용 `form-block__input-wrapper` 추가
- 로고 위 상단 여백 변수로 관리

---

## CSS

### 구조

```
base.css     → 기본 변수, reset, font (@import)
common.css   → 공통 컴포넌트 (container, sr-only)
style.css    → 메인 페이지 스타일
form.css     → 로그인/회원가입 폼 스타일
reset.css    → Meyer's Reset
font.css     → ROKAFSans 폰트
```

### 변수

```css
--max-width: 1140px

--color-blue: #3692FF
--color-blue-light: #E6F2FF
--color-white: #FFFFFF

--color-banner-bg: #CFE5FF
--color-footer-bg: #111827

--color-gray-50 ~ 900: 그레이 스케일

--spacing-form-header-top: 60px
--spacing-form-gap: 24px
```

- CSS 변수로 색상 시스템 통일 관리
- Max-width 1140px 제한
- 폰트: Pretendard Variable (CDN) + ROKAFSans (로고, 폰트 파일)  
- 레이아웃: flexbox
- Mobile First 접근 방식
- BEM 네이밍 컨벤션 사용

### 페이지별 헤더 분리

- 메인: `.page-header` (sticky)
- 폼: `.form-header` (중앙 정렬)  

---

## 현재 상태
- **완성:** index.html, login.html, signup.html  
- **부분 완성:** items.html, faq.html, privacy.html (템플릿)  
- **JS:** 폼 검증 로직 및 비밀번호 보기/숨기기 기능 완성

---

## TODO

### HTML/CSS
- [x] `login.html`: 로그인 폼 구현
- [x] `signup.html`: 회원가입 폼 구현
- [x] CSS 구조 개선 (common.css 분리)
- [x] 페이지별 헤더 네이밍 분리 (page-header, form-header)
- [x] CSS 변수 확대 (색상, 간격)
- [x] 비밀번호 토글 버튼 구조 개선 (wrapper 적용)
- [ ] `items.html`: 상품 리스트 페이지 구성  
- [ ] `faq.html`: 자주 묻는 질문 콘텐츠 작성  
- [ ] `privacy.html`: 개인정보처리방침 콘텐츠 작성

### JavaScript
- [x] Zod 스타일 스키마 기반 폼 검증 로직 구축
- [x] 비밀번호 보기/숨기기 기능 구현

### 반응형
- [x] **반응형 디자인 적용 완료** (PC 1200px+, Tablet 768px~1199px, Mobile 375px~767px)

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
- [x] 비밀번호 토글 버튼 정렬 최적화 (wrapper 적용)
- [x] 비밀번호 보기/숨기기 기능 구현

### [반응형]
- [x] **반응형 디자인 적용 완료** (PC 1200px+, Tablet 768px~1199px, Mobile 375px~767px)  
  - PC/Tablet/Mobile 분기 처리  
  - "판다마켓" 로고와 "로그인" 버튼 간격 반응형 조정  
  - 요소 간 간격, 크기, 폰트 크기 등 유동적 변환

### [SEO/메타]
- [x] 메타 태그 설정 (제목: "판다 마켓", 설명: "일상의 모든 물건을 거래해보세요")

### [심화]
- [x] 브라우저 크기에 따라 모든 크기 관련 값이 유동적으로 변환
- [x] CSS 변수를 통한 스타일 시스템 구축
- [x] BEM 네이밍 컨벤션 적용
- [x] 구조적 HTML (시맨틱 태그 사용)

---

## 주요 개선 사항

### 1. CSS 구조 개선
- `common.css` 추가로 공통 컴포넌트 분리
- `base.css`에서 reset, font import 처리
- 파일별 역할 명확화

### 2. 페이지별 헤더 분리
- 메인: `.page-header` (sticky positioning)
- 폼: `.form-header` (중앙 정렬)
- 중복 방지 및 유지보수성 향상

### 3. CSS 변수 확대
- 색상: `--color-blue`, `--color-blue-light`, `--color-white`
- 간격: `--spacing-form-header-top`, `--spacing-form-gap`
- 하드코딩 색상 제거

### 4. 비밀번호 토글 구조
- `.form-block__input-wrapper` 추가
- 버튼 정확한 중앙 정렬
- 베스트 프랙티스 적용

### 5. 폼 검증 로직 리팩토링

#### v3 (현재)
- `assets/utility/zod.js`에서 문자열·숫자·객체 스키마와 체이닝 가능한 `refine` 규칙을 제공하는 경량 Zod 스타일 라이브러리를 구축하여 공통 검증 규칙을 집중화
- `assets/schemas/login.js`, `assets/schemas/signup.js`에서 폼별 스키마를 선언적으로 정의하고 `errors`·`touched`·`validated` 상태를 추적하며 blur/input/submit 흐름을 제어
- `assets/utility/form-ui.js`를 통해 에러 메시지와 `valid`/`invalid` 클래스를 일관되게 갱신해 UI 반영을 단순화
- `assets/js/form.js`가 DOMContentLoaded 시 검증 초기화와 비밀번호 토글 버튼 바인딩을 담당하도록 역할을 명확히 분리
- 기존 `validation.js` 기반 절차형 검증 로직을 제거하고, 스키마 중심 구조로 유지보수성과 재사용성을 강화

#### v2
- **선언적 검증 시스템**: `data-validate` 속성 기반
  - HTML에서 `data-validate="required|email|max:50"` 형태로 검증 규칙 선언
  - `rules` 객체로 규칙 기반 검증 (required, email, min, max, match)
  - `validateInput()` 함수로 각 input을 독립적으로 검증
- **규칙별 통합 메시지**: 함수 지원으로 동적 메시지 생성
- **개선된 상태 관리**: `invalid`/`valid` 클래스로 시각적 피드백
- **버튼 상태 관리**: `updateButtonState()` 함수로 모든 필드 검증 후 버튼 활성화/비활성화
- 반복 코드 제거 및 헬퍼 함수 활용
- 실시간 검증 및 버튼 활성화/비활성화 처리
- 비밀번호 보기/숨기기 토글 기능 구현
- null 안전성 체크 및 에러 처리 개선

#### v1
- `config` 객체 기반 검증 시스템
  - `form.dataset.type`으로 login/signup 구분
  - 각 필드별 `validator` 함수와 `isInvalid` 플래그로 상태 관리
  - `validation.js`의 함수들(`validateEmail`, `validatePassword` 등) 직접 사용
- 필드별 개별 메시지 관리 (`messages.email.required`, `messages.email.invalid` 등)
- 에러 클래스: `form-block__group--error`
