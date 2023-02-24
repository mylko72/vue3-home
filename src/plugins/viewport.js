import { reactive, ref } from 'vue';

export default {
	install(app, options) {
		const $viewport = reactive({
			mode: 'mobile',
			size: {
				width: 0,
				height: 0,
			},
		});

		updateSize();

		function updateSize() {
			const winWidth = window.innerWidth;

			if (winWidth < 768) {
				$viewport.mode = 'mobile';
			} else if (winWidth >= 768 && winWidth < 992) {
				$viewport.mode = 'tablet';
			} else {
				$viewport.mode = 'desktop';
			}

			$viewport.size.width = window.innerWidth;
			$viewport.size.height = window.innerHeight;
		}

		window.addEventListener('resize', updateSize);

		app.provide('viewport', $viewport);
	},
};
