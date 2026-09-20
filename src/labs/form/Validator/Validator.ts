import {
  ValidatorConfigs,
  FieldConfig,
  ValidateFn,
  ValidationResult,
  InferredForm,
  InferredContext,
  InferredError,
} from './types';

const isString = (value: unknown): value is string => typeof value === 'string';

/** 검증 결과의 타입을 정확히 추론할 수 있도록 `configs`의 타입은 `satisfies` 키워드를 이용해 정의할 것. */
export class Validator<
  Configs extends ValidatorConfigs<any, any>,
  F = InferredForm<Configs>,
  C = InferredContext<Configs>,
> {
  #configs: Configs;
  #entries: [string, FieldConfig<F, C>][];

  constructor(configs: Configs) {
    this.#configs = configs;
    this.#entries = Object.entries(configs);
  }

  #resolveContext(fn: ValidateFn<F, C>, form: F, context?: C) {
    return context !== undefined ? fn(form, context) : fn(form, undefined as C);
  }

  checkAll(...params: C extends void ? [form: F] : [form: F, context: C]) {
    const [form, context] = params;
    const VALIDATION_RESULT: ValidationResult<Configs>[] = [];

    const result = this.#entries.reduce((a, [key, config]) => {
      const { isValid, errorMessage, ignoreWhen = () => false } = config;
      const willIgnore = this.#resolveContext(ignoreWhen, form, context);
      const validity = this.#resolveContext(isValid, form, context);

      if (willIgnore) {
        return a;
      }
      if (!validity) {
        a.push({ key, errorMessage } as ValidationResult<Configs>);
      }
      return a;
    }, VALIDATION_RESULT);

    return {
      isValid: result.length === 0,
      isErrorOf: (field: keyof Configs) => this.#configs[field].errorMessage === result[0]?.errorMessage,
      getFirstError: () => (result[0]?.errorMessage ?? '') as InferredError<Configs>,
      getAllErrors: () => result,
    };
  }

  isErrorOf(field: string | RegExp, errorMessage: string) {
    if (!errorMessage) {
      return false;
    }
    if (isString(field)) {
      return this.#configs[field].errorMessage === errorMessage;
    } else {
      const matched = this.#entries.filter(
        ([key, config]) => config.errorMessage === errorMessage && field.test(key),
      );

      return matched.length > 0;
    }
  }
}
