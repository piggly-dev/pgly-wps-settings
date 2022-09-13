export declare type RuleValidator<T = any> = (v: T) => void;
export default class ValidatorEngine {
    static apply<T = any>(rules: Array<RuleValidator>, value: T, onError: (message: string) => void, onSuccess: () => void): void;
}
