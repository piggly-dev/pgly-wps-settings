export type RuleValidator<T = any> = (v: T) => void;

export default class ValidatorEngine {
	public static apply<T = any> (
		rules: Array<RuleValidator>,
		value: T,
		onError: (message: string) => void,
		onSuccess: () => void
	): void {
		try {
			rules.forEach(validator => validator(value));
			onSuccess();
		} catch (err: any) {
			onError(err.message);
		}
	}
}
