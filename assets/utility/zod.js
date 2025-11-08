// 정규표현식
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createSchema(typeFn) {
  // 내부에 누적될 규칙 배열
  const checks = [];
  const transforms = [];

  // 체이닝용 API 객체
  const api = {
    checks,
    transforms,
    required(message) {
      checks.push({
        kind: "required",
        check: (v) => v != null && v !== "",
        message: message || "필수 입력입니다.",
      });
      return this;
    },
    // 검증 실행 메서드
    parse(value) {
      // 1) 타입 검증
      if (!typeFn(value)) {
        return { success: false, error: "기대한 타입이 아닙니다." };
      }

      // 2) 변환기 적용
      for (const fn of transforms) {
        value = fn(value);
      }

      // 3) 규칙 순차 평가
      for (const rule of checks) {
        if (!rule.check(value)) {
          return { success: false, error: rule.message };
        }
      }

      return { success: true, value };
    },
    safeParse(value) {
      try {
        const result = this.parse(value);
        if (!result.success) throw new Error(result.error);
        return { success: true, data: result.value };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },
  };

  return api;
}

function stringSchema() {
  const schema = createSchema((v) => typeof v === "string");

  return Object.assign(schema, {
    min(len, msg) {
      schema.checks.push({
        kind: "min",
        check: (v) => v.length >= len,
        message: msg || `${len}자 이상이어야 합니다.`,
      });
      return schema;
    },
    max(len, msg) {
      schema.checks.push({
        kind: "max",
        check: (v) => v.length <= len,
        message: msg || `${len}자 이하이어야 합니다.`,
      });
      return schema;
    },
    length(len, msg) {
      schema.checks.push({
        kind: "length",
        check: (v) => v.length === len,
        message: msg || `${len}자여야 합니다.`,
      });
      return schema;
    },
    regex(pattern, msg) {
      schema.checks.push({
        kind: "regex",
        check: (v) => pattern.test(v),
        message: msg || "형식이 올바르지 않습니다.",
      });
      return schema;
    },
    email(msg) {
      const pattern = EMAIL_REGEX;
      schema.checks.push({
        kind: "email",
        check: (v) => pattern.test(v),
        message: msg || "올바른 이메일 형식이 아닙니다.",
      });
      return schema;
    },
    url(msg) {
      schema.checks.push({
        kind: "url",
        check: (v) => {
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: msg || "유효한 URL이 아닙니다.",
      });
      return schema;
    },
    includes(substr, msg) {
      schema.checks.push({
        kind: "includes",
        check: (v) => v.includes(substr),
        message: msg || `"${substr}"을(를) 포함해야 합니다.`,
      });
      return schema;
    },
    trim() {
      schema.transforms.push((v) => v.trim());
      return schema;
    },
  });
}

function numberSchema() {
  const schema = createSchema((v) => typeof v === "number" && !isNaN(v));

  return Object.assign(schema, {
    min(num, msg) {
      schema.checks.push({
        kind: "min",
        check: (v) => v >= num,
        message: msg || `${num} 이상이어야 합니다.`,
      });
      return schema;
    },

    max(num, msg) {
      schema.checks.push({
        kind: "max",
        check: (v) => v <= num,
        message: msg || `${num} 이하이어야 합니다.`,
      });
      return schema;
    },

    int(msg) {
      schema.checks.push({
        kind: "int",
        check: (v) => Number.isInteger(v),
        message: msg || "정수여야 합니다.",
      });
      return schema;
    },

    positive(msg) {
      schema.checks.push({
        kind: "positive",
        check: (v) => v > 0,
        message: msg || "양수여야 합니다.",
      });
      return schema;
    },

    negative(msg) {
      schema.checks.push({
        kind: "negative",
        check: (v) => v < 0,
        message: msg || "음수여야 합니다.",
      });
      return schema;
    },
  });
}

const v = {
  string: stringSchema,
  number: numberSchema,
};

export { v };