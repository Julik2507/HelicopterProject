<script>
    export let img = "";
    export let link = "/";

    function onClick() {
        window.location.href = link;
    }
</script>

<button class="link_btn" on:click={onClick}>
    <img src={img} alt=""/>
</button>

<style>
    .link_btn {
        background: none;
        border: none;
        padding: 0;
    }
</style>