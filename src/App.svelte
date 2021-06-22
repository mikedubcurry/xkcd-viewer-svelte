<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import Comic from './Comic.svelte';
	import Controls from './Controls.svelte';
	import { storedTheme, theme } from './store';

	beforeUpdate(() => {
		if ($theme === 'light') {
			document.documentElement.style.setProperty('--theme-bg', 'var(--light-theme)');
			document.documentElement.style.setProperty('--theme-txt', 'var(--light-txt)');
			document.documentElement.style.setProperty('--theme-btn', 'var(--light-btn)');
			document.documentElement.style.setProperty('--theme-title', 'var(--light-title)');
		}
		if ($theme === 'dark') {
			document.documentElement.style.setProperty('--theme-bg', 'var(--dark-theme)');
			document.documentElement.style.setProperty('--theme-txt', 'var(--dark-txt)');
			document.documentElement.style.setProperty('--theme-btn', 'var(--dark-btn)');
			document.documentElement.style.setProperty('--theme-title', 'var(--dark-title)');
		}
	});
	$storedTheme;
</script>

<h1>Svelte Powered <a href="https://xkcd.com/">xkcd</a> Viewer</h1>
<button class="theme-btn"
	on:click={() => {
		if ($theme === 'light') theme.set('dark');
		else if ($theme === 'dark') theme.set('light');
	}}
>
	{#if $theme === 'light'}
		🌙
	{:else}
		☀️
	{/if}
</button>

<div id="controls">
	<Controls />
</div>
<div id="comic">
	<Comic />
</div>

<style>
	h1 {
		color: var(--theme-title);
		margin-top: 50px;
		text-align: center;
	}

	h1 > a {
		color: var(--theme-title)
	}

	.theme-btn {
		position: absolute;
		top: 25px;
		left: 25px;
	}
	
	#comic {
		width: 100%;
		margin: 0 auto;
		/* margin-top: 50px; */
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
</style>
