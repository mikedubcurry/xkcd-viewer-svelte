<script>
  let max = 0;
  let current;
  let comic = getComic();

  async function getComic(number) {
    if (number > max) {
      throw new Error("that comic hasnt been made yet");
    }
    const res = await fetch(
      `https://xkcd.now.sh/?comic=${number ? number : "latest"}`
    );
    const json = await res.json();

    if (res.ok) {
      current = json.num;
      if (current > max) max = current;
      return json;
    } else {
      throw new Error(json);
    }
  }

  function handleNext() {
    comic = getComic(current + 1);
  }
  function handlePrev() {
    comic = getComic(current - 1);
  }
  function handleByNum() {
    comic = getComic(current);
  }
  function handleLatest() {
    comic = getComic();
  }
</script>

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

<h1>Svelte Powered XKCD Viewer</h1>

<div id="controls">
  <button on:click={handlePrev}>Prev</button>
  <!-- <input type="number" bind:value={current} /> -->
  <button on:click={handleByNum}>Get by number</button>
  <button on:click={handleNext}>next</button>

</div>
<button on:click={handleLatest}>Get latest</button>
<div id="comic">
  {#await comic}
    <p>loading</p>

  {:then response}
    <h3 id="title">{response.title}</h3>
    <p id="num">#{response.num}</p>
    <img width={300} src={response.img} alt={response.alt} />
  {:catch error}
    <p>{error}</p>
  {/await}
</div>
