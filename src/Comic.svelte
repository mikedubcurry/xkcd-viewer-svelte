<script lang="ts">
	import { comic, theme } from './store';
	$: darkTheme = $theme === 'dark';
</script>

{#if $comic}
	<h3 id="title">{$comic.safe_title}</h3>
	<p id="num">#{$comic.num}</p>
	<a href={`https://xkcd.com/${$comic.num}/`}>
		<img class:darkTheme src={$comic.img} alt={$comic.alt} />
	</a>
{:else}
	<p>loading</p>
{/if}

<style>
	#num {
		text-align: center;
		margin-bottom: 24px;
	}

	img {
		margin: 0 auto;
		margin-bottom: 2rem;
		max-width: 100%;
	}
	img.darkTheme {
		filter: invert(100%);
	}
	#title {
		text-align: center;
	}
</style>
