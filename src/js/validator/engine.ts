import ValidatorRule from './rule';

export default class ValidatorEngine {
	public static apply<T = any>(
		rules: Array<ValidatorRule>,
		value: T,
		onError: (message: string) => void,
		onSuccess: () => void
	): void {
		try {
			rules.forEach(rule => rule.apply(value));
			onSuccess();
		} catch (err: any) {
			onError(err.message);
		}
	}
}
