<script lang="ts">
	import { current, max, fetchComic } from './store';
	let a;
	function handlePrev() {
		current.update(($current) => {
			let num = $current - 1;
			if (num > 0) {
				fetchComic($current - 1);
				return num;
			}
			return num + 1;
		});
	}
	function handleNext() {
		current.update(($current) => {
			let num = $current + 1;
			if (num <= $max) {
				fetchComic(num);
				return num;
			}
			return num - 1;
		});
	}
	function handleByNum() {
		if ($current > $max) {
			current.set($max);
		} else if ($current < 1) {
			current.set(1);
		}
		fetchComic($current);
	}
	function handleLatest() {
		current.set($max);
		fetchComic($max);
	}
</script>

<div class="prev-next">
	<button on:click={handlePrev}>Prev</button>
	<input
		type="number"
		on:keypress={(e) => {
			e.key === 'Enter' && handleByNum();
		}}
		max={$max}
		min="1"
		bind:value={$current}
	/>
	<button on:click={handleByNum}>Go &rarr;</button>
	<button on:click={handleNext}>next</button>
</div>
<button on:click={handleLatest}>Get latest</button>

<style>
	.prev-next {
		margin: 0 auto;
	}
	.prev-next :first-child {
		margin-right: 2rem;
		border-radius: 2rem 0 0 2rem;
	}
	.prev-next :last-child {
		margin-left: 2rem;
		border-radius: 0 2rem 2rem 0;
	}
</style>
