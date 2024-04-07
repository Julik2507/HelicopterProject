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
        margin: 0;
        font-family: Epilogue, sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: center;
    }
</style>