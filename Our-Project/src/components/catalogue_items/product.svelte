<script>
    import { getOneGoods } from "$lib/Axios/goodsAxios";
    import img from "$lib/img/default_item.png"

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function openModal() {
        dispatch('openModal');
    }

    export let type = "default";
    export let name = "Багет";
    export let amount = "180 г";
    export let price = 85;
    export let sale_price = 70;

    async function showInfo() {
        let base_info;
        let detailed_info;
        await getOneGoods(1).then(result => {
            base_info = result.good;
            detailed_info = result.description;
        });
        console.log(base_info);
        console.log(detailed_info);
    }
</script>

<div class="item">
    <img src={img} alt={name}/>
    <p class="item__name">{name}</p>
    <div class="item__msg">
        <p class="item__amount">{amount}</p>
        {#if type === "new"}
        <p class="item__new">Новинка</p>
        {/if}
    </div>
    {#if type === "default" || type === "new" }
    <button class="item__button">{price} ₽ +</button>
    {/if}
    {#if type === "missing"}
    <button class="item__button" disabled>Нет в наличии</button>
    {/if}
    {#if type === "sale"}
    <button class="item__button" disabled><p class="item__old__price">{price}</p> {sale_price} ₽ +</button>
    {/if}
    <button class="item__button" on:click={openModal}>Подробнее</button>
</div>

<style>
    .item {
        background-color: white;
        display: flex;
        flex-direction: column;
        width: fit-content;
        height: fit-content;
        gap: 0;
        padding: 10px;
    }
    .item__name {
        font-family: Epilogue, sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
        margin: 0;
    }
    .item__amount {
        font-family: Epilogue, sans-serif;
        font-size: 12px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
        margin: 0;
        color: #A6A6A6;
    }
    .item__button {
        width: fit-content;
        background: #F1F1F1;
        border-radius: 50px;
        border: none;
        font-family: Epilogue, sans-serif;
        font-size: 13px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
        color: #FF335F;
        display: flex;
        gap: 10px;
    }
    .item__msg {
        display: flex;
        gap: 10px;
    }
    .item__new {
        font-family: Epilogue, sans-serif;
        font-size: 12px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
        color: #3AB600;
        margin: 0;
    }
    .item__old__price {
        margin: 0;
        font-family: Epilogue;
        font-size: 13px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
        color: #A6A6A6;
        text-decoration: line-through;
    }
</style>