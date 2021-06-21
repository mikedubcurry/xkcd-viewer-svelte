<script lang="ts">
	function handlePrev() {}
	function handleNext() {}
	function handleByNum() {}
	function handleLatest() {}
</script>

<button on:click={handlePrev}>Prev</button>
<input type="number" bind:value={current} />
<button on:click={handleByNum}>Get by number</button>
<button on:click={handleNext}>next</button>
<button on:click={handleLatest}>Get latest</button>

<style>
</style>
