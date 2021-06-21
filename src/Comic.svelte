<script lang="ts">
	let max = 0;
	export let current: number;
	let comic = getComic();
	async function getComic(number: number = undefined) {
		if (number > max) {
			throw new Error('that comic hasnt been made yet');
		}
		const res = await fetch(`https://xkcd.now.sh/?comic=${number ? number : 'latest'}`);
		const json = await res.json();
		if (res.ok) {
			current = json.num;
			if (current > max) max = current;
			return json;
		} else {
			throw new Error(json);
		}
	}
</script>

{#await comic}
	<p>loading</p>
{:then response}
	<h3 id="title">{response.title}</h3>
	<p id="num">#{response.num}</p>
	<img src={response.img} alt={response.alt} />
{:catch error}
	<p>{error}</p>
{/await}

<style>
</style>
