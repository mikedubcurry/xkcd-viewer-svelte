<script lang="ts">
	import Comic from './Comic.svelte';
	import Controls from './Controls.svelte';
</script>

<h1>Svelte Powered xkcd Viewer</h1>

<div id="controls">
	<Controls />
</div>
<div id="comic">
	<Comic  />
</div>

<style>
	h1 {
		color: purple;
		text-align: center;
	}
	
	#comic {
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	#controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

</style>
