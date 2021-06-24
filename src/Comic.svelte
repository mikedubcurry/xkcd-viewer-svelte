<script lang="ts">
	import { comic, theme, current, max, fetchComic, favorites } from './store';
	import TouchSurface from './TouchSurface.svelte';

	let t: number;

	function left() {
		document.getElementById('img').classList.add('swipeleft');
		t = window.setTimeout(() => {
			document.getElementById('img').classList.remove('swipeleft');
			clearTimeout(t);
		}, 500);
		if ($current + 1 <= $max) {
			current.set($current + 1);
			fetchComic($current);
		}
	}
	function right() {
		document.getElementById('img').classList.add('swiperight');
		t = window.setTimeout(() => {
			document.getElementById('img').classList.remove('swiperight');
			clearTimeout(t);
		}, 500);
		if ($current - 1 !== 0) {
			current.set($current - 1);
			fetchComic($current);
		}
	}
	function down() {
		document.getElementById('img').classList.add('swipedown');
		document.getElementById('star').classList.add('clicked')
		t = window.setTimeout(() => {
			document.getElementById('img').classList.remove('swipedown');
			document.getElementById('star').classList.remove('clicked')
			clearTimeout(t);
		}, 500);
		if ($favorites.includes($comic.num)) {
			favorites.set($favorites.filter((num) => num !== $comic.num));
		} else {
			favorites.set([...$favorites, $comic.num].sort());
		}
	}

	$: darkTheme = $theme === 'dark';
</script>

{#if $comic}
	<a href={`https://xkcd.com/${$comic.num}/`}>
		<h3 id="title">{$comic.safe_title}</h3>
	</a>
	<p id="num">#{$comic.num}</p>
	<TouchSurface on:left={left} on:right={right} on:down={down}>
		<img id="img" class:darkTheme src={$comic.img} alt={$comic.alt} />
	</TouchSurface>
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
