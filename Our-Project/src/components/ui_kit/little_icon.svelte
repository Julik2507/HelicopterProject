<script>
    export let source = "";

    export let event = () => { }
</script>

<button class="button" on:click={event}>
    <img src={source} alt="" class="little__icon"/>
</button>

<style>
    .button {
        background: none;
        border: none;
    }
    .little__icon {
        width: 49px;
        height: 46px;
    }
</style>