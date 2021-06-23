<script lang="ts">
    import { onMount } from "svelte";
    let box;
    onMount(() => {
        box = document.querySelector<HTMLElement>("#touch-box");
        box.addEventListener("touchstart", handleTouchStart);
        box.addEventListener("touchend", handleTouchEnd);
        box.addEventListener("touchcancel", handleTouchCancel);
        box.addEventListener("touchmove", handleTouchMove);
    });

    // let touching = false;
    let touchStart;
    let touchEnd;
    function handleTouchStart(e: TouchEvent) {
        e.preventDefault();
        console.log("touchstart.");
        const [touch] = e.changedTouches;
        touchStart = { x: touch.clientX, y: touch.clientY, t: e.timeStamp };
    }
    function handleTouchEnd(e: TouchEvent) {
        e.preventDefault();
        console.log(e);
        const [lastTouch] = e.changedTouches;
        touchEnd = { x: lastTouch.clientX, y: lastTouch.clientY, t: e.timeStamp };

        console.log("from ", touchStart, " to ", touchEnd);
        console.log(touchEnd.t - touchStart.t);
        
    }
    function handleTouchCancel() {}
    function handleTouchMove(e: TouchEvent) {
        // e.preventDefault()
        // // console.log(e);
        // const targets = e.targetTouches
        // for(let touch of targets) {
        //     console.log(touch);
        // }
    }
</script>

<main id="touch-box" />

<style>
    main {
        width: 75%;
        height: 60%;
        margin: 0 auto;
        background-color: #5bf;
    }
</style>
