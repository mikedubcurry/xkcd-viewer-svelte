<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { storedTheme, theme } from "./store";

    beforeUpdate(() => {
        if ($theme === "light") {
            document.documentElement.style.setProperty("--theme-bg", "var(--light-theme)");
            document.documentElement.style.setProperty("--theme-txt", "var(--light-txt)");
            document.documentElement.style.setProperty("--theme-btn", "var(--light-btn)");
            document.documentElement.style.setProperty("--theme-title", "var(--light-title)");
            document.documentElement.style.setProperty("--theme-outline", "var(--light-outline)");
        }
        if ($theme === "dark") {
            document.documentElement.style.setProperty("--theme-bg", "var(--dark-theme)");
            document.documentElement.style.setProperty("--theme-txt", "var(--dark-txt)");
            document.documentElement.style.setProperty("--theme-btn", "var(--dark-btn)");
            document.documentElement.style.setProperty("--theme-title", "var(--dark-title)");
            document.documentElement.style.setProperty("--theme-outline", "var(--dark-outline)");
        }
    });
    $storedTheme;
</script>

<button
    title="Toggle dark/light mode"
    class="theme-btn"
    on:click={() => {
        if ($theme === "light") theme.set("dark");
        else if ($theme === "dark") theme.set("light");
    }}
>
    {#if $theme === "light"}
        🌙
    {:else}
        ☀️
    {/if}
</button>

<style>
    .theme-btn {
        position: absolute;
        top: 25px;
        left: 25px;
    }
</style>
