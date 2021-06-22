<script lang="ts">
    import { current, max, fetchComic, favorites, storedFavorites } from "./store";
    let clicked = false;
    let favorited = false;
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
    function favoriteComic() {
        favorites.update(() => {
            let num = $current;
            if ($favorites.includes(num)) {
                return $favorites.filter((n) => n !== num);
            }
            return [...$favorites, $current];
        });
        clicked = true;
        let t = setTimeout(() => {
            clicked = false;
        }, 500);
    }
    $: console.log($storedFavorites);
    $: favorited = $favorites.includes($current);
</script>

<div class="prev-next">
    <button disabled={$current === 1} on:click={handlePrev}>Prev</button>
    <input
        type="number"
        on:keypress={(e) => {
            e.key === "Enter" && handleByNum();
        }}
        max={$max}
        min="1"
        bind:value={$current}
    />
    <button on:click={handleByNum}>Go &rarr;</button>
    <button disabled={$current === $max} on:click={handleNext}>next</button>
</div>
<button on:click={handleLatest}>Get latest</button>
<!-- add menu to quickly access favorties -->
<!-- <button class:clicked class:favorited on:click={favoriteComic} class="star" /> -->

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
    .star {
        width: 36px;
        height: 36px;
        background-color: purple;
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
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .star::after {
        display: inline-block;
        width: 100%;
        height: 100%;
        transform: scale(70%);
        content: "";
        background-color: gold;
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
    button.favorited::after {
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
