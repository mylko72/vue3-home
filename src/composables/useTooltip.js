import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

export const useTooltip = (...paramObjs) => {
	const anchorTop = ref('0');
	const anchorLeft = ref('0');
  const anchorDirection = ref(null);
  const anchorMessage = ref('');
	const anchor = [];
	const direction = [];
  const message = [];
	let index = 0;

	function calcPosition(direction, clientRect) {
		const { top, left, height, width } = clientRect;
		const absTop = window.pageYOffset + top;
		const absLeft = window.pageXOffset + left;
		let resTop = 0;
		let resLeft = 0;

		if (direction === 'top') {
			resTop = absTop - height;
			resLeft = absLeft + width / 2;
		} else if (direction === 'bottom') {
			resTop = absTop + height;
			resLeft = absLeft + width / 2;
		} else if (direction === 'left') {
			resTop = absTop + height / 8;
			resLeft = absLeft;
		} else if (direction === 'right') {
			resTop = absTop + height / 8;
			resLeft = absLeft + width;
		}

		return {
			top: resTop,
			left: resLeft,
		};
	}

	function setTooltip(anchor, direction, message) {
		const clientRect = anchor.getBoundingClientRect();

		// console.log('direction', direction);
		const { top, left } = calcPosition(direction, clientRect);

		anchorTop.value = top + 'px';
		anchorLeft.value = left + 'px';
    anchorDirection.value = direction;
    anchorMessage.value = message;

		// console.log('top', anchorTop.value);
		// console.log('left', anchorLeft.value);
	}

	function resetPosition() {
		anchorTop.value = '-9999px';
		anchorLeft.value = '0';
	}

	onMounted(() => {
		for (let obj of paramObjs) {
			anchor[index] = obj.anchor;
			direction[index] = obj.direction;
      message[index] = obj.message;
			index++;
		}

		anchor.forEach((item, i) => {
			const tooltipAnchor = item.value;
			const tooltipDirection = direction[i];
      const tooltipMessage = message[i];

			tooltipAnchor.addEventListener('mouseenter', () => {
				// updatePosition(tooltipAnchor, tooltipDirection);
        setTooltip(tooltipAnchor, tooltipDirection, tooltipMessage);
			});

			tooltipAnchor.addEventListener('mouseout', () => {
				resetPosition();
			});
		});
	});

	// onUnmounted(() => {});

	return {
		anchorTop,
		anchorLeft,
    anchorDirection,
    anchorMessage
	};
};