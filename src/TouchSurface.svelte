<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let box;
	onMount(() => {
		box = document.querySelector<HTMLElement>('#touch-box');
		box.addEventListener('touchstart', handleTouchStart);
		box.addEventListener('touchend', handleTouchEnd);
		box.addEventListener('touchmove', handleTouchMove);
	});

	let touchStart;
	let touchEnd;

	function handleTouchStart(e: TouchEvent) {
		e.preventDefault();
		const [touch] = e.changedTouches;
		touchStart = { x: touch.clientX, y: touch.clientY, t: e.timeStamp };
	}

	function handleTouchEnd(e: TouchEvent) {
		e.preventDefault();
		const [lastTouch] = e.changedTouches;
		touchEnd = { x: lastTouch.clientX, y: lastTouch.clientY, t: e.timeStamp };
		let dir = direction(touchStart, touchEnd);
		let dist = distance(touchStart, touchEnd);
		if (dist < 20) return;
		if (dir === 'right') {
			dispatch('right');
		}
		if (dir === 'left') {
			dispatch('left');
		}
		if (dir === 'down') {
			dispatch('down');
		}
		if (dir === 'up') {
			dispatch('up');
		}
	}

	function handleTouchMove(e: TouchEvent) {
		// control sliding of comic here
	}

	function distance(p1: Point, p2: Point): number {
		let deltaX = p1.x - p2.x;
		let deltaY = p1.y - p2.y;
		return Math.sqrt(deltaX ** 2 + deltaY ** 2);
	}
	function direction(p1: Point, p2: Point): Direction {
		let { x: x1, y: y1 } = p1;
		let { x: x2, y: y2 } = p2;
		if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {
			// left/right
			if (x1 > x2) {
				return 'left';
			} else {
				return 'right';
			}
		} else {
			// up/down
			if (y1 > y2) {
				return 'up';
			} else {
				return 'down';
			}
		}
	}

	type Point = { x: number; y: number };
	type Direction = 'up' | 'down' | 'left' | 'right';
</script>

<main id="touch-box">
	<slot />
</main>

<style>
	main {
		margin: 0 10px;
	}
</style>
