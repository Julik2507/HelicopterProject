<script>
    import { createEventDispatcher } from "svelte";

    export let name = "Хлеб и выпечка";
    export let catID = "22";

    let dispatch = createEventDispatcher();

    function selectCategory() {
        dispatch("select_category", { catID, name });
    }
</script>

<button class="category" on:click={selectCategory}>
    <p class="category__name">{name}</p>
</button>

<style>
    .category {
        display: flex;
        background: none;
        border: none;
        gap: 10px;
        padding-left: 25px;
    }
    .category__name {
        font-family: Epilogue, sans-serif;
        font-size: 28px;
        font-weight: 700;
        line-height: 22.5px;
        letter-spacing: -0.27px;
        text-align: left;
    }
</style>