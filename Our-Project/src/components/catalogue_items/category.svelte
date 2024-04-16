<script>
    import img from "$lib/img/default_category.png";
    export let name = "Хлеб и выпечка";
</script>

<button class="category">
    <img class="category__img" src={img} alt=""/>
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
        font-size: 14px;
        font-weight: 700;
        line-height: 22.5px;
        letter-spacing: -0.27px;
        text-align: left;
    }
</style>