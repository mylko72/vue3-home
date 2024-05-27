import { ref } from 'vue';

export const useObserver = (target, showCallback, hideCallback) => {
	let observer;

	const config = ref({
		root: null,
		rootMargin: '0px 0px 0px 0px',
		threshold: 0.1,
	});

	const callback = entries => {
		entries.forEach(entry => {
			const { isIntersecting } = entry;

			if (isIntersecting) {
				if (showCallback && typeof showCallback == 'function') {
					showCallback();
				}
			} else {
				if (hideCallback && typeof hideCallback == 'function') {
					hideCallback();
				}
			}
		});
	};

	if ('IntersectionObserver' in window) {
		observer = new IntersectionObserver(callback, config.value);
	}

	return {
		observer,
	};
};
