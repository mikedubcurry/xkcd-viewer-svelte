<script lang="ts">
    const box = document.querySelector<HTMLElement>("#touch-box");
    box.addEventListener("touchstart", handleTouchStart);
    box.addEventListener("touchend", handleTouchEnd);
    box.addEventListener("touchcancel", handleTouchCancel);
    box.addEventListener("touchmove", handleTouchMove);

    let ongoingTouches = [];

    function handleTouchStart(evt) {
        evt.preventDefault();
        console.log("touchstart.");

        var ctx = box.getContext("2d");
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            console.log("touchstart:" + i + "...");
            ongoingTouches.push(copyTouch(touches[i]));
            var color = colorForTouch(touches[i]);
            ctx.beginPath();
            ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false); // a circle at the start
            ctx.fillStyle = color;
            ctx.fill();
            console.log("touchstart:" + i + ".");
        }
    }
    function handleTouchEnd() {}
    function handleTouchCancel() {}
    function handleTouchMove() {}

    function colorForTouch(touch) {
        var r = touch.identifier % 16;
        var g = Math.floor(touch.identifier / 3) % 16;
        var b = Math.floor(touch.identifier / 7) % 16;
        r = r.toString(16); // make it a hex digit
        g = g.toString(16); // make it a hex digit
        b = b.toString(16); // make it a hex digit
        var color = "#" + r + g + b;
        console.log("color for touch with identifier " + touch.identifier + " = " + color);
        return color;
    }

    function copyTouch({ identifier, pageX, pageY }) {
        return { identifier, pageX, pageY };
    }
</script>

<main id="touch-box" />

<style>
</style>
