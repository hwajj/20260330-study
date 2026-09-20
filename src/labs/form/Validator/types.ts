/** 로컬 복사본: backoffice-shared `IsUnknown`과 동일 */
export type IsUnknown<T> = unknown extends T ? (T extends unknown ? true : false) : false;

export type ValidateFn<F, C> = (form: F, context: C) => boolean;

export type AsyncValidateFn<F, C> = (form: F, context: C) => boolean | Promise<boolean>;

interface BaseFieldConfig<F, C> {
  isValid: ValidateFn<F, C> | AsyncValidateFn<F, C>;
  ignoreWhen?: (form: F, context: C) => boolean;
  errorMessage: unknown;
}

export interface FieldConfig<F, C> extends BaseFieldConfig<F, C> {
  isValid: ValidateFn<F, C>;
}

/** - Promise<boolean>을 반환하는 `isValid` 함수에서 `ignoreWhen`을 같이 사용해 불필요한 API 호출을 줄일 수 있음. */
export interface AsyncFieldConfig<F, C> extends BaseFieldConfig<F, C> {
  maxRetry: number | ((error: unknown) => number);
}

/**
 * 객체 Configs의 key는 **필드명[세부 항목]** 로 구성해야 함.
 * @example "emailId", "emailDomain", "emailConvention" 등
 */
export type ValidatorConfigs<F, C = void> = Record<string, FieldConfig<F, C>>;

export type AsyncValidatorConfigs<F, C = void> = Record<string, AsyncFieldConfig<F, C>>;

type BaseValidatorConfigs<F, C = void> = Record<string, BaseFieldConfig<F, C>>;

export type InferredForm<T> = T extends BaseValidatorConfigs<infer F, any> ? F : never;

export type InferredContext<T> = T extends BaseValidatorConfigs<any, infer C>
  ? IsUnknown<C> extends true
    ? void
    : C
  : never;

export type InferredError<T> = T extends BaseValidatorConfigs<any, any> ? T[keyof T]['errorMessage'] : never;

export type ValidationResult<T> = T extends BaseValidatorConfigs<any, any>
  ? {
      key: keyof T;
      errorMessage: InferredError<T>;
    }
  : never;
