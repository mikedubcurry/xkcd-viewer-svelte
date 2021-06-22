<script lang="ts">
    import { comic } from "./store";

</script>

{#if $comic}
    <h3 id="title">{$comic.safe_title}</h3>
    <p id="num">#{$comic.num}</p>
    <img src={$comic.img} alt={$comic.alt} />
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
    }
    #title {
        text-align: center;
    }
</style>
