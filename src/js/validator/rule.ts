export default abstract class ValidatorRule {
	public abstract apply<T = any>(value: T): void;
}
