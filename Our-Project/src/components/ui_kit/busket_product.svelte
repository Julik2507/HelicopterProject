<script>
    import img from "$lib/img/default_item.png"
    export let name = "Батон";
    export let price = 65;
    export let amount = "1 шт.";

    let count = 1;
    
    function uptick() { count += 1; }
    function downtick() { count -= 1; count = Math.max(count, 0); }
</script>

<div class="busket_product">
    <div class="name_block">
        <img src={img} alt = "">
        <p class="name">{name} ({amount})</p>
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
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
    }
    .name_block {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .name {
        font-family: Epilogue, sans-serif;
        font-size: 22px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.20999999344348907px;
        text-align: left;
        color: #FF335F;
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