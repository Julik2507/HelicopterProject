<script>
    import Header from "$comp/frames/header.svelte"
    import PrimeBtn from "$comp/ui_kit/prime_btn.svelte"
    import Footer from "$comp/frames/footer.svelte"
    import BusketProduct from "$comp/ui_kit/busket_product.svelte";
    import ErrorWindow from "$comp/auth_pop_ups/error_window.svelte";

    import { onMount } from "svelte";
    import { getMyBasketGoods } from "$lib/Axios/basketAxios";
    import { sendUserDataToDelivery } from "$lib/Axios/basketAxios";
    import { getTotalPrice } from "$lib/Axios/basketAxios";

    let busketNames = [];
    let busketIDs = [];
    let busketInfo = [];
    let totalPrice = 0;

    let displayError = false;
    let errorMessage = "";

    async function getBusket() {
        busketIDs = [];
        busketNames = [];
        busketInfo = [];
        try {
            await getMyBasketGoods().then(result => {
                for (let i = 0; i < result.info.result.length; ++i) {
                    busketNames.push(result.result[i].goodsName);
                    busketInfo.push(result.info.result[i]);
                    busketIDs.push(result.result[i].goods_id);
                }
                totalPrice = result.info.totalPriceCounter;
            });
            displayError = false;
        } catch (err) {
            errorMessage = err.message;
            displayError = true;
        }
        totalPrice = totalPrice;
        busketIDs = busketIDs;
        busketNames = busketNames;
        busketInfo = busketInfo;
    }
    onMount(async () => { getBusket() });

    async function updatePrice() {
        await getTotalPrice().then(result => {
            totalPrice = result.data.totalPrice;
        })
    }

    let name = "";
    let surname = "";
    let numberPhone = "";
    let city = "";
    let street = "";
    let house = "";
    let apartment = "";
    let corporate = "";
    let entrance = "";
    let floor = "";
    let code = "";

    async function sendData() {
        try {
            await sendUserDataToDelivery({
                name: name,
                surname: surname,
                numberPhone: Number(numberPhone),
                city: city,
                street: street,
                house: Number(house),
                Kvartira: Number(apartment),
                Korporativ: Number(corporate),
                podiezd: Number(entrance),
                etaz: Number(floor),
                kodOtDomofona: Number(code)
            }).then(result => {
                console.log(result);
                displayError = true;
                errorMessage = result;
            })
        } catch (err) {
            displayError = true;
            errorMessage = err.message;
        }
    }

    function ErrorDisplayUpdate() {
        displayError = !displayError;
    }
</script>

<ErrorWindow isModalOpen={displayError} on:closeModal={ErrorDisplayUpdate} msg={errorMessage}/>
<Header money={totalPrice}/>
<p class="subtitle">Корзина</p>
<div class="busket">
    <div class="busket_titles">
        <p class="busket_title">Продукт</p>
        <p class="busket_title">Цена</p>
        <p class="busket_title">Количество</p>
        <p class="busket_title">Сумма</p>
    </div>
    <div class="busket_content">
        {#if busketInfo.length == 0}
            <p class="error_msg">В корзине ничего нет</p>
        {:else}
            {#await busketInfo then data }
                {#each {length: busketInfo.length } as _, i}
                    <BusketProduct prodID={busketIDs[i]} name={busketNames[i]} price={busketInfo[i].price} count={busketInfo[i].quantity} on:uptick={updatePrice} on:downtick={updatePrice}/>
                {/each}
            {/await}
        {/if}
    </div>
</div>
<p class="field_title">Общая стоимость: {totalPrice}</p>
<div class="receiver_info">
    <p class="subtitle left_tab">Получатель</p>
    <div class="receiver_credits">
        <div class="field">
            <p class="field_title">Имя</p>
            <input class="field_input" bind:value={name}/>
        </div>
        <div class="field">
            <p class="field_title">Фамилия</p>
            <input class="field_input" bind:value={surname}/>
        </div>
        <div class="field">
            <p class="field_title">Телефон</p>
            <input class="field_input" bind:value={numberPhone}/>
        </div>
    </div>
    <p class="subtitle left_tab">Адрес доставки</p>
    <div class="receiver_credits">
        <div class="field">
            <p class="field_title">Улица</p>
            <input class="field_input" bind:value={street}/>
        </div>
        <div class="field">
            <p class="field_title">Корп.</p>
            <input class="field_input_short" bind:value={corporate}/>
        </div>
        <div class="field">
            <p class="field_title">Дом</p>
            <input class="field_input_short" bind:value={house}/>
        </div>
        <div class="field">
            <p class="field_title">Код</p>
            <input class="field_input_short" bind:value={code}/>
        </div>
        <div class="field">
            <p class="field_title">Подъезд</p>
            <input class="field_input_short" bind:value={entrance}/>
        </div>
        <div class="field">
            <p class="field_title">Этаж</p>
            <input class="field_input_short" bind:value={floor}/>
        </div>
        <div class="field">
            <p class="field_title">Кв.</p>
            <input class="field_input_short" bind:value={apartment}/>
        </div>
    </div>
    <div class="field">
        <p class="field_title">Город</p>
        <input class="field_input" bind:value={city}/>
    </div>
</div>
<PrimeBtn text="Оформить заказ" event={sendData}/>
<div class="span"></div>
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
        flex-direction: column;
        gap: 20px;
        border-style: solid;
        border-color: black;
        border-top: 0;
        border-width: 1px;
        border-radius: 0 0 15px 15px;
        margin-bottom: 30px;
        min-height: 30px;
        background-color: #eeeeee;
    }
    .receiver_info {
        width: 100%;
        margin-bottom: 30px;
        border-style: solid;
        border-color: black;
        border-width: 1px;
        border-radius: 15px;
        padding-bottom: 10px;
        background-color: #eeeeee;
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
        margin-left: 8px;
        font-family: Epilogue, sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0.20999999344348907px;
        text-align: left;
    }
    .field_input {
        padding: 5px;
        border-radius: 5px;
        border-width: 1px;
        width: 300px;
        font-family: Epilogue, sans-serif;
        font-weight: 400;
        letter-spacing: 0.20999999344348907px;
    }
    .field_input_short {
        padding: 5px;
        border-radius: 5px;
        border-width: 1px;
        width: 100px;
    }
    .busket_title {
        margin: 0;
        font-family: Epilogue, sans-serif;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0.20999999344348907px;
        margin-top: 6px;
        margin-bottom: 6px;
    }
    .error_msg {
        font-family: Epilogue, sans-serif;
        font-size: 20px;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: center;
        margin: 0;
        margin-top: 6px;
    }
    .span {
        height: 30px;
    }
    .left_tab {
        margin-left: 20px;
    }
</style>