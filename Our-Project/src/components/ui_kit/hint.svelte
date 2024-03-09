<script>
    export let source = "";
    export let text = "";
</script>

<div class="hint__content">
    <img class="hint__img" src={source} alt="">
    <p class="hint__text">{text}</p>
</div>

<style>
    .hint__content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
    .hint__img {
        width: 270px;
    }
    .hint__text {
        padding: 0;
    }
</style>