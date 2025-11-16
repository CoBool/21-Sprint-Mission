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
Form Values (email,password 등 사용자 입력값) 
🔽
Schema (필드별 검증 규칙 선언)
🔽
validation (값 + 규칙 -> 검증 결과 리턴 *순수함수)
🔽
state (errors, touch, valid 등 중앙 상태관리)
🔽
UI (state 값을 읽고 표현만 담당 side-effect 발생)
🔽
external logic (submit 가능 여부 판단 (state 의 valid 기반))
```

