# 판다마켓

중고거래 플랫폼  
배포: [https://sprint.boolean.kr/](https://sprint.boolean.kr/)
Github Pages: [https://cobool.github.io/21-Sprint-Mission/](https://cobool.github.io/21-Sprint-Mission/)


---

## 개요
스프린트 21기 프론트엔드 미션.  
HTML/CSS로 구성된 정적 중고거래 플랫폼 **“판다마켓”** 제작.

---

Form 검증 로직 추상화 및 리팩토링

```text
사용자 입력
   ↓
Form Values (현재 입력값 수집)
   ↓
Schema (필드별 검증 규칙 배열)
   ↓
Validation Engine 
   - runRules
   - validateField
   - validateAll
   ↓
State Layer
   - errors, touched 업데이트
   ↓
UI Layer
   - valid/invalid 스타일 반영
   - 에러 메시지 출력
   ↓
External Logic (onSubmit)
   - 모든 필드 통과 시 처리
```

# Form 검증 아키텍처 - 설계 근거 정리

검증 로직 리팩토링에서 **검증·상태·UI·Submit 로직을 명확하게 분리한 구조**로 재구성.  
해당 설계를 선택한 이유에 대한 요약.

---

## 1. Rules Layer (순수 함수 기반 검증 규칙)

- 모든 규칙은 `(value, ctx) → string | null` 형태의 **순수 함수**로 작성.  
- DOM, UI, 상태에 의존하지 않도록 분리하여  
  **재사용성**, **독립성**, **단위 테스트 용이성**을 확보.

---

## 2. Validation Engine (검증 처리 전담)

- 필드 단위와 전체 검증을 처리하는 전용 레이어로 분리.
- 역할을 “검증 결과 산출”로 한정해 **단일 책임 원칙(SRP)**을 부여.
- UI 업데이트, DOM 접근, 상태 관리 등을 내부에서 수행하지않음.

---

## 3. State Layer (검증 상태 중앙 관리)

- `errors`, `touched` 등을 한곳에서 관리하도록 설계.
- 외부 접근은 getter/setter 메서드로 제한해 **캡슐화**.
- Validator는 상태만 갱신하고 직접 UI를 수정하지않음.

---

## 4. UI Layer (검증 결과 → 화면 표현)

- 검증 엔진과 상태로부터 나온 정보를 기반으로 DOM 업데이트 담당.
- 시각 표현을 별도 레이어로 분리해 유지보수성과 가독성 향상.

---

## 5. Submit Layer (제출 가능 여부 판단)

- 모든 필드가 `State Layer의 touched + error 없음` 조건을 충족하는지 판단해 제출 가능 여부를 결정.
- 실제 제출 로직은 콜백(onSubmit)으로 분리해 확장성을 확보.

---

## 설계 방향 요약

- **예측 가능한 검증 흐름**
- **책임의 명확한 분리**
- **재사용 가능한 규칙 레이어**
- **UI/DOM과 검증 로직의 완전 분리**
- **다른 프로젝트나 폼에서도 쉽게 확장 가능한 구조**

---

## 수정 필요

- **모든 Input** 요소에서 Blur 이벤트가 발생해야 **Submit** 활성화.
    - 해당부분은 오류는 아니지만 다소 부자연스러운 동작으로 고민필요
    - RHF, Vee 등 타 라이브러리 동작방식 체크 및 참고
- **교차검증 Rules** 요소 A에서 값이 변경시 B에서도 재검증 필요. 
    - 현재는 Name 기반으로 매우 간단하게 임시처리된 상태

## 향후 계획
- **React**에서 바로 사용할 수 있도록 수정
    - UI Layer 부분 수정 State Layer 기반으로 동작하도록 해당 레이어 수정
        - Form Values관리방법 체크
        - const [FormValues, setFormValues] = useState[?] 이 방법은 아닌것같음  
        해당방법으로 할 경우 계속 State가 변경되서 불필요한 리렌더링 발생 가능성 있음.
        