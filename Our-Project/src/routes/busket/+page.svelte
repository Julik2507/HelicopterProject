<script>
    import Header from "$comp/frames/header.svelte"
    import PrimeBtn from "$comp/ui_kit/prime_btn.svelte"
    import Footer from "$comp/frames/footer.svelte"
    import BusketProduct from "$comp/ui_kit/busket_product.svelte";
</script>

<Header/>
<p class="subtitle">Корзина</p>
<div class="busket">
    <div class="busket_titles">
        <p>Продукт</p>
        <p>Цена</p>
        <p>Количество</p>
        <p>Сумма</p>
    </div>
    <div class="busket_content">
        <BusketProduct/>
    </div>
</div>
<div class="receiver_info">
    <p class="subtitle">Получатель</p>
    <div class="receiver_credits">
        <div class="field">
            <p class="field_title">Имя</p>
            <input class="field_input"/>
        </div>
        <div class="field">
            <p class="field_title">Фамилия</p>
            <input class="field_input"/>
        </div>
        <div class="field">
            <p class="field_title">Телефон</p>
            <input class="field_input"/>
        </div>
    </div>
    <p class="subtitle">Адрес доставки</p>
    <div class="receiver_credits">
        <div class="field">
            <p class="field_title">Улица</p>
            <input class="field_input"/>
        </div>
        <div class="field">
            <p class="field_title">Корп.</p>
            <input class="field_input_short"/>
        </div>
        <div class="field">
            <p class="field_title">Дом</p>
            <input class="field_input_short"/>
        </div>
        <div class="field">
            <p class="field_title">Код</p>
            <input class="field_input_short"/>
        </div>
        <div class="field">
            <p class="field_title">Подъезд</p>
            <input class="field_input_short"/>
        </div>
        <div class="field">
            <p class="field_title">Этаж</p>
            <input class="field_input_short"/>
        </div>
        <div class="field">
            <p class="field_title">Кв.</p>
            <input class="field_input_short"/>
        </div>
    </div>
</div>
<PrimeBtn text="Оформить заказ"/>
<Footer/>

<style>
    .subtitle {
        font-family: Epilogue, sans-serif;
        font-size: 22px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: -0.33000001311302185px;
        text-align: left;
        color: #1C0F0D;
        margin-left: 5px;
    }
    .busket {
        width: 100%;
    }
    .busket_titles {
        display: flex;
        justify-content: space-around;
        border-style: solid;
        border-color: black;
        border-width: 1px;
        border-radius: 15px 15px 0 0;
        font-size: 20px;
    }
    .busket_content {
        display: flex;
        justify-content: space-around;
        border-style: solid;
        border-color: black;
        border-top: 0;
        border-width: 1px;
        border-radius: 0 0 15px 15px;
        margin-bottom: 30px;
    }
    .receiver_info {
        width: 100%;
        margin-bottom: 30px;
        border-style: solid;
        border-color: black;
        border-width: 1px;
        border-radius: 15px;
        padding-bottom: 10px;
    }
    .receiver_credits {
        display: flex;
        gap: 30px;
    }
    .field {
        margin-left: 10px;
    }
    .field_title {
        margin: 0;
        font-family: Epilogue, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.20999999344348907px;
        text-align: left;
    }
    .field_input {
        padding: 5px;
        border-radius: 5px;
        border-width: 1px;
        width: 300px;
    }
    .field_input_short {
        padding: 5px;
        border-radius: 5px;
        border-width: 1px;
        width: 100px;
    }
</style>