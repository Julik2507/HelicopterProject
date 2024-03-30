<script>
    export let text = "Батон и белый хлеб";
    export let event = () => {
        console.log(text);
    }
</script>

<button class="tab__btn" on:click={event}><p class="btn__text">{text}</p></button>

<style>
    .tab__btn {
        background-color: #F1F1F1;
        border: none;
        height: fit-content;
        padding: 10px;
        border-radius: 50px;
    }
    .btn__text {
        font-family: Epilogue, sans-serif;
        font-size: 15px;
        font-weight: 900;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
        margin: 0;
        color: #808080;
    }
</style>