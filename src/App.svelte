<!-- break thememing into separate component -->
<script lang="ts">
    import { beforeUpdate } from "svelte";
    import Comic from "./Comic.svelte";
    import Controls from "./Controls.svelte";
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import { pathname } from "./store";

    beforeUpdate(() => {
        $pathname;
    });
</script>

<h1>Svelte Powered <a href="https://xkcd.com/">xkcd</a> Viewer</h1>

<ThemeSwitcher />

<div id="controls">
    <Controls />
</div>
<div id="comic">
    <!-- add gesture support for mobile?? -->
    <Comic />
</div>

<style>
    h1 {
        color: var(--theme-title);
        margin-top: 50px;
        text-align: center;
    }

    h1 > a {
        color: var(--theme-title);
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
