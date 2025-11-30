# 판다마켓 (Panda Market)

중고거래 플랫폼 프로젝트

## 🌐 배포 링크

**접속 URL**: [https://sprint.boolean.kr](https://sprint.boolean.kr)

## 프로젝트 개요

React + Vite를 사용한 중고거래 마켓플레이스 웹 애플리케이션입니다.

## 기술 스택

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router 7.9.6
- **HTTP Client**: Axios 1.13.2
- **Styling**: CSS Modules

## 프로젝트 구조

```
src/
├── assets/           # 이미지, 아이콘 등 정적 리소스
│   ├── images/
│   │   ├── home/     # 홈 페이지 이미지
│   │   └── icons/    # 아이콘
│   └── styles/       # 전역 스타일
├── components/       # 공통 컴포넌트
│   ├── layout/       # Header, Footer
│   └── ui/           # 재사용 가능한 UI 컴포넌트
│       └── Image.jsx
├── features/         # 기능별 모듈
│   ├── home/         # 홈 페이지 관련
│   │   └── components/
│   │       └── FeatureCard/
│   └── items/        # 상품 관련
│       ├── api/      # API 호출
│       │   └── itemsApi.js
│       └── components/
│           ├── ProductsList.jsx      # 상품 목록 컴포넌트
│           ├── ItemsSort.jsx         # 정렬 컴포넌트
│           ├── Pagination.jsx        # 페이지네이션
│           ├── Skeleton.jsx          # 스켈레톤 UI
│           └── index.js
├── pages/            # 페이지 컴포넌트
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Items.jsx
│   ├── ItemDetail.jsx
│   └── AddItem.jsx
├── lib/              # 라이브러리 설정
│   └── axios.js      # Axios 인스턴스 설정
└── utility/          # 유틸리티 함수
    ├── number.js     # 숫자 포맷팅
    └── pagination.js # 페이지네이션 계산
```

## 주요 기능

### 1. 홈 페이지 (`/`)
- 히어로 섹션
- 주요 기능 소개 (Hot Item, Search, Register)

### 2. 상품 목록 페이지 (`/items`)
- **베스트 상품 섹션**: 인기 상품 표시
  - 반응형: 모바일 1개, 태블릿 2개, PC 4개
- **전체 상품 섹션**:
  - 검색 기능 (구현예정)
  - 정렬 기능 (최신순, 인기순)
  - 페이지네이션
  - 반응형 그리드 레이아웃
- **스켈레톤 UI**: 로딩 상태 표시

### 3. 상품 상세 페이지 (`/items/:itemId`)
- 구현 예정

### 4. 상품 등록 페이지 (`/items/additem`)
- 구현 예정

### 5. 인증 페이지
- 로그인 (`/login`)
- 회원가입 (`/signup`)

## 주요 컴포넌트

### ProductsList
상품 목록을 그리드 형태로 표시하는 컴포넌트

### ItemsSort
상품 정렬 기능 (최신순, 인기순)
- 모바일: 아이콘만 표시
- 태블릿 이상: 텍스트 + 드롭다운

### Pagination
페이지네이션 컴포넌트

### Skeleton
로딩 중 스켈레톤 UI 컴포넌트
- 베스트 상품 스켈레톤
- 전체 상품 스켈레톤
- 헤더 스켈레톤

## 반응형 디자인

- **모바일** (< 768px): 
  - 베스트 상품: 1열
  - 전체 상품: 2열
  - 페이지 사이즈: 4개
- **태블릿** (768px ~ 1200px): 
  - 베스트 상품: 2열
  - 전체 상품: 3열
  - 페이지 사이즈: 6개
- **PC** (≥ 1200px): 
  - 베스트 상품: 4열
  - 전체 상품: 5열
  - 페이지 사이즈: 10개

## API

### Items API (`features/items/api/itemsApi.js`)
- `fetchItems(page, pageSize, orderBy)`: 상품 목록 조회
  - `page`: 페이지 번호
  - `pageSize`: 페이지당 아이템 수
  - `orderBy`: 정렬 기준 (`"recent"` | `"favorite"`)

## 유틸리티 함수

### pagination.js
- `getPagination(totalCount, currentPage, pageSize, visiblePageCount)`: 페이지네이션 정보 계산
  - 반환값: `{ hasPrevPage, hasNextPage, visiblePages }`

### number.js
- `formatPrice(price)`: 가격 포맷팅 (천 단위 콤마)

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 검사
npm run lint
```

## 주요 구현 사항

### Items 페이지
- 화면 크기에 따른 동적 페이지 사이즈 조정
  - `window.matchMedia`를 활용한 반응형 처리
  - 초기값을 동적으로 계산하여 타이밍 이슈 해결
- Grid 레이아웃을 활용한 헤더 구조
  - 모바일: 2행 2열 (제목/등록, 검색/정렬)
  - 태블릿 이상: 1행 5열 (제목/검색/등록/정렬)
- 스켈레톤 UI를 통한 로딩 상태 개선
  - 애니메이션 효과 적용

### 스타일링
- CSS Modules 사용
- CSS 변수를 활용한 일관된 디자인 시스템
- 반응형 미디어 쿼리 적용

### 컴포넌트 구조
- Feature 기반 폴더 구조
- 재사용 가능한 컴포넌트 분리
- 스켈레톤 컴포넌트를 별도로 분리하여 관리

## 라우팅

```javascript
/                    → Home
/login               → Login
/signup              → Signup
/items               → Items (상품 목록)
/items/additem       → AddItem (상품 등록)
/items/:itemId       → ItemDetail (상품 상세)
```

## 향후 작업

- [ ] 상품 상세 페이지 구현
- [ ] 상품 등록 페이지 구현
- [ ] 로그인, 회원가입 폼 검증
- [ ] 인증 기능 구현
- [ ] 검색 기능 구현
- [ ] 좋아요 기능 구현
