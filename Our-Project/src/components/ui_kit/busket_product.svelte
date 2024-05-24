<script>
    export let prodID = 0;
    export let name = "Батон";
    export let price = 65;
    export let count = 1;
    let img = "";

    import { onMount } from "svelte";
    import { putGoodsInBasket } from "$lib/Axios/basketAxios";
    import { minusQuantityForGoods } from "$lib/Axios/basketAxios";
    import { createEventDispatcher } from "svelte";
    import { getOneGoods } from "$lib/Axios/goodsAxios";

    onMount(async () => {
        await getOneGoods(prodID).then(result => {
            img = result.good[0].img;
        })
    })

    let dispatch = createEventDispatcher();

    function uptick() {
        count += 1; 
        putGoodsInBasket(prodID);
        dispatch("uptick");
    }
    function downtick() {
        count -= 1; 
        minusQuantityForGoods(prodID);
        dispatch("downtick");
    }
</script>

<div class="busket_product">
    <div class="name_block">
        <img src="http://176.109.107.106/api/{img}" alt = "" class="img">
        <p class="name">{name}</p>
    </div>
    <div class="common_block">
        <p class="price">{price} ₽</p>
    </div>
    <div class="common_block">
        <div class="counter">
            <button class="counter_button" on:click={downtick}>-</button>
            <div class="counter_count">{count}</div>
            <button class="counter_button" on:click={uptick}>+</button>
        </div>
    </div>
    <div class="common_block">
        <p class="price">{price*count} ₽</p>
    </div>
</div>

<style>
    .busket_product {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width: 100%;
    }
    .name_block {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .img {
        width: 200px;
        height: 200px;
    }
    .name {
        font-family: Epilogue, sans-serif;
        font-size: 22px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.20999999344348907px;
        text-align: left;
        color: #FF335F;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .common_block {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .price {
        font-family: Epilogue, sans-serif;
        font-size: 22px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.20999999344348907px;
        text-align: left;
    }
    .counter {
        display: flex;
    }
    .counter_button {
        width: 40px;
        height: 40px;
        background-color: #F23B0D;
        font-family: Epilogue, sans-serif;
        font-size: 32px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0.20999999344348907px;
        text-align: left;
        color: #FFFFFF;
        text-align: center;
        border: none;
    }
    .counter_count {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 38px;
        width: 100px;
        font-family: Epilogue, sans-serif;
        font-size: 24px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
        border-top: 1px solid #B1B1B1;
        border-bottom: 1px solid #B1B1B1;
    }
</style>