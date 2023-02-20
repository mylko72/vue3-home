import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

export const useScroll = (options = {}) => {
	const pageYOffset = ref(0);
	const pageXOffset = ref(0);
	const absTop = ref(0);
	const absLeft = ref(0);

	function update() {
		pageYOffset.value = window.pageYOffset;
		pageXOffset.value = window.pageXOffset;
	}

	function updateAbsPos(target) {
		const { top, left } = target.value.getBoundingClientRect();
		absTop.value = top + window.pageYOffset;
		absLeft.value = left + window.pageXOffset;
	}

	onMounted(() => {
		const { target, top } = { ...options };

		if (target) {
			updateAbsPos(target);
		}

		if (top) {
			absTop.value = top + window.pageYOffset;
		}

		window.addEventListener('scroll', update);

		window.addEventListener('resize', () => {
			target && updateAbsPos(target);
		});
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', update);
		window.removeEventListener('resize', () => {
			target && updateAbsPos(target);
		});
	});

	return {
		pageXOffset,
		pageYOffset,
		absTop,
		absLeft,
	};
};
