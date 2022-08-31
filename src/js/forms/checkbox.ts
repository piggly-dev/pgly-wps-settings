function PglyCheckbox($checkbox: HTMLInputElement) {
	if ($checkbox.dataset.name === undefined) {
		return;
	}

	const input = document.createElement('input');
	input.type = 'hidden';
	input.name = $checkbox.dataset.name as string;
	input.value = $checkbox.dataset.selected === 'true' ? '1' : '0';

	if ($checkbox.dataset.id) {
		input.id = $checkbox.dataset.id;
	}

	$checkbox.appendChild(input);

	$checkbox.addEventListener('click', () => {
		const selected: boolean = $checkbox.dataset.selected === 'true';

		$checkbox.dataset.selected = !selected ? 'true' : 'false';
		$checkbox.classList.toggle('pgly-checked--state');
		input.value = !selected ? '1' : '0';
	});
}

const handlePglyCheckbox = () => {
	(document.querySelectorAll('.pgly-wps--checkbox') || []).forEach(
		($checkbox: Element): void => {
			PglyCheckbox($checkbox as HTMLInputElement);
		}
	);
};

export { PglyCheckbox, handlePglyCheckbox };
