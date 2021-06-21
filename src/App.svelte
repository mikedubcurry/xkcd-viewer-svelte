<script lang="ts">
	import Comic from './Comic.svelte';
	import Controls from './Controls.svelte';
	let current;

	// function handleNext() {
	// 	comic = getComic(current + 1);
	// }
	// function handlePrev() {
	// 	comic = getComic(current - 1);
	// }
	// function handleByNum() {
	// 	comic = getComic(current);
	// }
	// function handleLatest() {
	// 	comic = getComic();
	// }
</script>

<h1>Svelte Powered XKCD Viewer</h1>

<div id="controls">
	<Controls />
	<!-- <button on:click={handlePrev}>Prev</button>
	<input type="number" bind:value={current} />
	<button on:click={handleByNum}>Get by number</button>
	<button on:click={handleNext}>next</button> -->
</div>
<button on:click={handleLatest}>Get latest</button>
<div id="comic">
	<Comic {current} />
</div>

<style>
	h1 {
		color: purple;
	}
	#comic {
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}
	img {
		margin: 0 auto;
	}
	#title {
		text-align: center;
	}
	#num {
		text-align: center;
		margin-bottom: 24px;
	}
	#controls {
		display: flex;
		justify-content: space-between;
	}
</style>
