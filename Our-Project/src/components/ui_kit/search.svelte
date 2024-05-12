<script>
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    let value = "";

    function onChange() {
        dispatch("search", { value });
    }
</script>

<input class="header__searchbar" type="text" name="email" placeholder="Искать в каталоге" bind:value={value} on:change={onChange}/>

<style>
    .header__searchbar {
        width: 100%;
        height: 63px;
        top: 202px;
        left: 36px;
        border-radius: 21px;
        border: 0;
        padding-left: 20px;
        background-color: #F5E8E8;
        color: #967878;
        font-size: 20px;
        font-weight: bold;
    }
</style>