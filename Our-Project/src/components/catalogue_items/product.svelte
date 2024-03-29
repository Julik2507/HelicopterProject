<script>
    export let type = "default";
    export let img = "src/img/default_item.png";
    export let name = "Багет";
    export let amount = "180 г";
    export let price = 85;
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
    <button class="item__button">{price} ₽ +</button>
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
</style>