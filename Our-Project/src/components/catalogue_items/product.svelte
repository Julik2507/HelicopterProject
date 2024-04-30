<script>
    import { getOneGoods } from "$lib/Axios/goodsAxios";
    import { onMount } from 'svelte';
    import ProductInfo from "./product_info.svelte";

    export let prodID = "7";
    export let type = "default";
    
    export let name = "Багет";
    export let amount = "180 г";
    export let price = 85;
    export let sale_price = 70;

    let base_info = [];
    let detailed_info = [];
    let img = "";
    onMount(async () => {
        await getOneGoods(parseInt(prodID, 10)).then(result => {
            base_info = result.good;
            detailed_info = result.description;
        });
        name = base_info[0].name;
        amount = detailed_info[0].value;
        img = base_info[0].img;
    })

    let isInfoOpen = false;
    function OpenInfo() {
        console.log("ping");
        isInfoOpen = true;
    }
    function CloseInfo() {
        isInfoOpen = false;
    }
</script>

<ProductInfo isModalOpen={isInfoOpen} on:closeModal={CloseInfo} prodID={prodID}/>
<div class="item">
    <img src= "http://176.109.107.106/api/{img}" alt=""/>
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
    <button class="item__button" on:click={OpenInfo}>Подробнее</button>
</div>

<style>
    .item {
        background-color: white;
        display: flex;
        flex-direction: column;
        width: 200px;
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
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
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