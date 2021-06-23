<script lang="ts">
    import { current, max, fetchComic, favorites, storedFavorites, comic } from "./store";

    let clicked = false;
    let favorited = false;
    let favVal = "";
    function handlePrev() {
        current.update(($current: number) => {
            let num = $current - 1;
            if (num > 0) {
                fetchComic($current - 1);
                return num;
            }
            return num + 1;
        });
    }
    function handleNext() {
        current.update(($current: number) => {
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
        document.querySelector<HTMLSelectElement>("favorites").value = ""; // reset to default
    }
    function handleLatest() {
        current.set($max);
        fetchComic($max);
    }
    function favoriteComic() {
        favorites.update(() => {
            let num = $current;
            if ($favorites.includes(num)) {
                return $favorites.filter((n) => n !== num);
            }
            return [...$favorites, $current].sort();
        });
        clicked = true;
        let t = setTimeout(() => {
            clicked = false;
        }, 500);
    }
    function handleSelectFavorite(
        e: FocusEvent & { currentTarget: EventTarget & HTMLSelectElement }
    ) {
        let val = e.currentTarget.value;
        if (val) {
            current.set(parseInt(e.currentTarget.value));
        } else {
            current.set($comic.num);
        }
    }

    $storedFavorites;
    $: favorited = $favorites.includes($current);
</script>

<div class="prev-next">
    <button class="btn" disabled={$current === 1} on:click={handlePrev}>Prev</button>
    <input
        class="current"
        type="number"
        on:keypress={(e) => {
            e.key === "Enter" && handleByNum();
        }}
        max={$max}
        min="1"
        bind:value={$current}
    />
    <button class="btn" disabled={$comic && $current === $comic.num} on:click={handleByNum}
        >Go &rarr;</button
    >
    <button class="btn" disabled={$current === $max} on:click={handleNext}>next</button>
</div>

<div class="group">
    <button class:clicked class:favorited on:click={favoriteComic} title="favorite" class="star" />
    <select
        id="favorites"
        on:change={handleSelectFavorite}
        on:blur={() => (favVal = "")}
        bind:value={favVal}
    >
        <option value=""> Favorites </option>
        {#each $favorites as fav}
            <option value={fav}>{fav}</option>
        {/each}
    </select>
    <button class="btn" on:click={handleLatest}>Get latest</button>
</div>

<style>
    .current {
        margin-right: 12px;
    }
    .group {
        width: fit-content;
        display: flex;
        align-items: center;
    }
    .group * {
        margin-right: 12px;
    }
    .group :last-child {
        margin-right: 0;
    }
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
    .btn:hover:not([disabled]) {
        filter: brightness(110%);
    }
    .star {
        width: 36px;
        height: 36px;
        background-color: var(--theme-title);
        clip-path: polygon(
            50% 0%,
            64% 32%,
            98% 35%,
            73% 59%,
            79% 91%,
            50% 74%,
            21% 91%,
            28% 58%,
            2% 35%,
            35% 32%
        );
        display: inline-flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .star::after {
        display: inline-block;
        width: 100%;
        height: 100%;
        transform: scale(70%);
        content: "";
        background-color: var(--theme-btn);
        clip-path: polygon(
            50% 0%,
            64% 32%,
            98% 35%,
            73% 59%,
            79% 91%,
            50% 74%,
            21% 91%,
            28% 58%,
            2% 35%,
            35% 32%
        );
        transition: transform 0.3s ease;
    }
    .star:hover::after {
        transform: scale(90%);
    }
    button.clicked::after {
        animation: pop 0.3s ease;
    }
    .star.favorited::after,
    .star.favorited:hover:after {
        background-color: yellow;
        transform: scale(110%);
    }
    @keyframes pop {
        0% {
            transform: scale(90%);
        }
        50% {
            transform: scale(299%);
        }
        100% {
            transform: scale(100%);
        }
    }
</style>
