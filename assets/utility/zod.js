/**
 * @fileoverview Lightweight schema validation library inspired by Zod.
 * Supports string, number, and object schemas with chainable validation rules.
 */

/** @constant {RegExp} EMAIL_REGEX - 이메일 형식 검사용 정규표현식 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 스키마 팩토리 함수.
 * @template T
 * @param {(value: unknown) => boolean} typeFn - 타입 검사 함수 (예: v => typeof v === "string")
 * @returns {object} - 체이닝 가능한 스키마 API
 */
function createSchema(typeFn) {
  /** @type {Array<{ kind: string, check: Function, message: string, path?: string | string[] }>} */
  const checks = []; // 검증 규칙 목록

  /** @type {Array<Function>} */
  const transforms = []; // 전처리 변환기 목록

  const api = {
    checks,
    transforms,

    /**
     * 값이 null, undefined, 빈 문자열인지 검사.
     * @param {string} [message="필수 입력입니다."] - 실패 시 메시지
     * @returns {typeof api}
     */
    required(message) {
      checks.push({
        kind: "required",
        check: (v) => v != null && v !== "",
        message: message || "필수 입력입니다.",
      });
      return this;
    },

    /**
     * 사용자 정의 정제 규칙을 추가.
     * @param {(value: T, ctx?: object) => boolean} fn - 조건 함수
     * @param {string} [msg="조건을 만족하지 않습니다."] - 실패 메시지
     * @returns {typeof api}
     */
    refine(fn, options) {
      let message = "조건을 만족하지 않습니다.";
      let path;

      if (typeof options === "string" || options === undefined) {
        message = options || message;
      } else if (options && typeof options === "object") {
        message = options.message || message;
        path = options.path;
      }

      checks.push({
        kind: "refine",
        check: (v, ctx) => fn(v, ctx),
        message,
        path: normalizePath(path),
      });
      return this;
    },

    /**
     * 실제 검증 수행 함수. 변환, 타입 검사, 규칙 순차 적용.
     * @param {T} value - 검증 대상 값
     * @param {object} [ctx={}] - 컨텍스트 (객체 교차검증 등에서 전달)
     * @returns {{ success: true, value: T } | { success: false, error: string }}
     */
    parse(value, ctx = {}) {
      if (!typeFn(value)) {
        return { success: false, error: "기대한 타입이 아닙니다." };
      }

      value = applyTransforms(value, transforms);

      const err = runChecks(value, checks, ctx);
      if (err) return { success: false, error: err };

      return { success: true, value };
    },

    /**
     * 예외 안전 버전의 parse. 항상 성공/실패 객체를 반환.
     * @param {T} value
     * @param {object} [ctx={}]
     * @returns {{ success: true, data: T } | { success: false, error: string }}
     */
    safeParse(value, ctx = {}) {
      try {
        const res = this.parse(value, ctx);
        if (!res.success) return res;
        return res;
      } catch (err) {
        return { success: false, error: err.message };
      }
    },
  };

  return api;
}

/**
 * 변환기 실행 유틸리티.
 * 등록된 모든 transform 함수를 순서대로 적용.
 * @param {any} value
 * @param {Array<Function>} transforms
 * @returns {any}
 */
function applyTransforms(value, transforms) {
  for (const fn of transforms) value = fn(value);
  return value;
}

/**
 * 규칙 실행 유틸리티.
 * 실패 시 첫 번째 에러 메시지를 반환.
 * @param {any} value
 * @param {Array<{ check: Function, message: string }>} checks
 * @param {object} ctx
 * @returns {string|null}
 */
function runChecks(value, checks, ctx) {
  for (const rule of checks) {
    const ok =
      rule.check.length === 2 ? rule.check(value, ctx) : rule.check(value);
    if (!ok) {
      return createValidationError(
        rule.message,
        rule.path
      );
    }
  }
  return null;
}

/**
 * path 값을 일관된 배열 형태로 정규화.
 * @param {string | number | Array<string | number> | undefined} path
 * @returns {Array<string | number> | undefined}
 */
function normalizePath(path) {
  if (path === undefined || path === null) return undefined;
  if (Array.isArray(path)) return path;
  return [path];
}

/**
 * 문자열처럼 동작하면서 path 정보를 포함하는 오류 객체 생성.
 * @param {string} message
 * @param {Array<string | number> | undefined} path
 * @returns {String & { path?: Array<string | number> }}
 */
function createValidationError(message, path) {
  const error = new String(message || "조건을 만족하지 않습니다.");
  if (path && path.length > 0) {
    Object.defineProperty(error, "path", {
      value: path,
      enumerable: true,
      configurable: true,
      writable: false,
    });
  }
  return error;
}

/**
 * 문자열 스키마 생성기
 * @returns {ReturnType<typeof createSchema> & {
 *  min(len: number, msg?: string): any,
 *  max(len: number, msg?: string): any,
 *  length(len: number, msg?: string): any,
 *  regex(pattern: RegExp, msg?: string): any,
 *  email(msg?: string): any,
 *  url(msg?: string): any,
 *  includes(substr: string, msg?: string): any,
 *  trim(): any
 * }}
 */
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
      schema.checks.push({
        kind: "email",
        check: (v) => EMAIL_REGEX.test(v),
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

/**
 * 숫자 스키마 생성기
 * @returns {ReturnType<typeof createSchema> & {
 *  min(num: number, msg?: string): any,
 *  max(num: number, msg?: string): any,
 *  int(msg?: string): any,
 *  positive(msg?: string): any,
 *  negative(msg?: string): any
 * }}
 */
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

/**
 * 객체 스키마 생성기
 * @param {Record<string, ReturnType<typeof createSchema>>} shape - 필드별 하위 스키마
 * @returns {{
 *  refine(fn: Function, msg?: string): any,
 *  parse(values: object, ctx?: object): { success: boolean, data?: object, error?: any },
 *  safeParse(values: object, ctx?: object): { success: boolean, data?: object, error?: any }
 * }}
 */
function objectSchema(shape) {
  const schema = {
    shape,
    _objectRefine: null,

    /**
     * 객체 전체 조건을 추가하는 refine.
     * @param {(data: object, ctx?: object) => boolean} fn - 검증 함수
     * @param {string} [msg="객체 조건을 만족하지 않습니다."] - 에러 메시지
     * @returns {typeof schema}
     */
    refine(fn, options) {
      let message = "객체 조건을 만족하지 않습니다.";
      let path;

      if (typeof options === "string" || options === undefined) {
        message = options || message;
      } else if (options && typeof options === "object") {
        message = options.message || message;
        path = options.path;
      }

      this._objectRefine = { fn, message, path: normalizePath(path) };
      return this;
    },

    /**
     * 모든 필드 스키마를 순회 검증 후 결과 병합.
     * @param {object} values - 실제 검증 대상 객체
     * @param {object} [ctx={}] - 교차검증 시 사용
     * @returns {{ success: true, data: object } | { success: false, error: Record<string, string> }}
     */
    parse(values, ctx = {}) {
      const result = {};
      const errors = {};

      for (const key in shape) {
        const fieldSchema = shape[key];
        const value = values[key];
        const res = fieldSchema.safeParse(value, values);
        if (res.success) result[key] = res.data;
        else errors[key] = res.error;
      }

      if (Object.keys(errors).length > 0) {
        return { success: false, error: errors };
      }

      if (this._objectRefine && !this._objectRefine.fn(result, ctx)) {
        const { message, path } = this._objectRefine;

        if (path && path.length > 0) {
          const [rootKey, ...restPath] = path;
          const errorMap = {};
          errorMap[rootKey] = createValidationError(
            message,
            restPath.length > 0 ? restPath : undefined
          );
          return { success: false, error: errorMap };
        }

        return { success: false, error: message };
      }

      return { success: true, data: result };
    },

    /**
     * 예외 없이 parse 결과를 반환하는 안전 버전.
     * @param {object} values
     * @param {object} [ctx={}]
     * @returns {{ success: boolean, data?: object, error?: string }}
     */
    safeParse(values, ctx = {}) {
      try {
        const res = this.parse(values, ctx);
        if (!res.success) return res;
        return res;
      } catch (err) {
        return { success: false, error: err.message };
      }
    },
  };

  return schema;
}

/**
 * 네임스페이스 객체.
 * @type {{
 *  string: typeof stringSchema,
 *  number: typeof numberSchema,
 *  object: typeof objectSchema
 * }}
 */
const v = {
  string: stringSchema,
  number: numberSchema,
  object: objectSchema,
};

export { v };