<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import PrimeBtn from "$comp/ui_kit/prime_btn.svelte";
    import { getOneGoods } from '$lib/Axios/goodsAxios';

    import cancelImg from "$lib/img/Cancel.svg";

    export let isModalOpen = false;
    export let prodID = "7";
    const dispatch = createEventDispatcher();

    function closeModal() {
        isModalOpen = false;
        dispatch('closeModal', { isModalOpen });
    }

    let img_src = "069b6801-eee6-4ca5-b8a7-b1f3ceca22b6.jpg"
    let name = "Багет"
    let amount = "180 г"
    let price = 85;
    let kcal = 229;
    let proteins = "8,3 г"
    let fats = "0,2 г"
    let cabrohydrates = "48,6 г"
    let composition = "Мука пшеничная высшего сорта, вода, закваска пшеничная (мука пшеничная высшего сорта, вода), соль, дрожжи хлебопекарные прессованные";
    let shelf_life = "3 дня"
    let conditions = "При температуре от +18°C до +25°C";
    let manufacturer = "ИП Козловская П. Ю., Россия";

    let base_info = [];
    let detailed_info = [];
    onMount(async () => {
        await getOneGoods(parseInt(prodID, 10)).then(result => {
            base_info = result.good;
            detailed_info = result.description;
        });
        name = base_info[0].name;
        amount = detailed_info[0].value;
        img_src = base_info[0].img;
        kcal = detailed_info[1].value;
        proteins = detailed_info[2].value;
        fats = detailed_info[3].value;
        cabrohydrates = detailed_info[4].value;
        composition = detailed_info[5].value;
        shelf_life = detailed_info[6].value;
        conditions = detailed_info[7].value;
        manufacturer = detailed_info[8].value;
    })
</script>

<div id="background" style="--display: {isModalOpen ? 'flex' : 'none'};"></div>
<div id="modal" class="info_modal" style="--display: {isModalOpen ? 'flex' : 'none'};">
    <img src = "http://176.109.107.106/api/{img_src}" alt="" class="product_img"/>
    <div class = "right_block">
        <div class = "info_content">
            <button class="modal_close" on:click={closeModal}><img src={cancelImg} alt="Close" style="width: 50px"></button>
            <p class = "info_name">{name}</p>
            <p class = "info_amount">{amount}</p>
            <div class = "info_in_100g">
                <p class = "info_subtitle">В 100 г:</p>
                <div class = "container_100g">
                    <div class = "container_block">
                        <p class = "info_text">{kcal}</p>
                        <p class = "info_subtitle">Ккал</p>
                    </div>
                    <div class = "container_block">
                        <p class = "info_text">{proteins}</p>
                        <p class = "info_subtitle">Белки</p>
                    </div>
                    <div class = "container_block">
                        <p class = "info_text">{fats}</p>
                        <p class = "info_subtitle">Жиры</p>
                    </div>
                    <div class = "container_block">
                        <p class = "info_text">{cabrohydrates}</p>
                        <p class = "info_subtitle">Углеводы</p>
                    </div>
                </div>
            </div>
            <p class = "info_subtitle">Состав</p>
            <p class = "info_text">{composition}</p>
            <div class = "split"></div>
            <p class = "info_subtitle">Срок хранения</p>
            <p class = "info_text">{shelf_life}</p>
            <div class = "split"></div>
            <p class = "info_subtitle">Условия хранения</p>
            <p class = "info_text">{conditions}</p>
            <div class = "split"></div>
            <p class = "info_subtitle">Производитеть</p>
            <p class = "info_text">{manufacturer}</p>
        </div>
        <PrimeBtn text="{price} ₽ +" --width="500px" event={closeModal}/>
    </div>
</div>

<style>
    #background {
        display: var(--display);
        background-color: rgba(100, 100, 100, 0.7);
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    #modal {
        display: var(--display);
        position: fixed;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-10%, -50%);
        background: #fff;
        filter: drop-shadow(0 0 20px #333);
        flex-direction: row;
    }

    .info_modal {
        display: flex;
        border-radius: 50px;
        padding: 30px;
        width: 920px;
        height: 830px;
        background-color: #dddddd;
        display: flex;
        gap: 20px;
    }
    .product_img {
        width: 400px;
        height: 400px;
        border-radius: 25px;
    }
    .right_block {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .info_in_100g {
        border-top: solid 1px;
        border-bottom: solid 1px;
        padding-top: 10px;
        margin-top: 20px;
        padding-bottom: 5px;
        margin-bottom: 20px;
        width: 500px;
    }
    .container_100g {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
    }
    .split {
        padding-top: 20px;
    }
    .info_name {
        margin: 0;
        margin-top: 15px;
        font-family: Epilogue, sans-serif;
        font-size: 32px;
        font-weight: 300;
        line-height: 31px;
        letter-spacing: 0.21px;
        text-align: left;
    }
    .info_amount {
        margin: 0;
        margin-top: 15px;
        margin-bottom: 15px;
        font-family: Epilogue, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
        color: #A6A6A6;
    }
    .info_subtitle {
        margin: 0;
        margin-top: 5px;
        font-family: Epilogue, sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
        color: #A6A6A6;
    }
    .info_text {
        margin: 0;
        margin-top: 5px;
        font-family: Epilogue, sans-serif;
        font-size: 18px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
    }
    .modal_close {
        width: 50px;
        border: none;
        padding: 0;
        float: right;
        margin-left: 460px;
        background: #fff;
    }
</style>