<script>
    import LittleIcon from "$comp/ui_kit/little_icon.svelte";
    import PrimeBtn from "$comp/ui_kit/prime_btn.svelte";
    import SocialLink from "$comp/ui_kit/social_link.svelte";
    import RegisterWindow from "$comp/auth_pop_ups/register_window.svelte";
    import LoginWindow from "$comp/auth_pop_ups/login_window.svelte";
    import Logo from "$comp/ui_kit/logo.svelte";
    import Search from "$comp/ui_kit/search.svelte";

    import icon1 from "$lib/img/Icon1.png";
    import icon2 from "$lib/img/Icon2.png";
    import icon3 from "$lib/img/Icon3.png";
    import icon4 from "$lib/img/Icon4.png";
    import logoVK from "$lib/img/LinkVK.png";
    import logoTG from "$lib/img/LinkTG.png";

    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import { getTotalPrice } from "$lib/Axios/basketAxios";
    import { getUserName } from "$lib/Axios/authAxios";

    export let money = 0;
    let name = "";
    let displayName = false;

    async function updateHeader() {
        try {
            await getUserName().then(result => {
                name = result.name;
                displayName = true;
            })
            await getTotalPrice().then(result => {
                money = result.data.totalPrice;
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    onMount(async () => {
        updateHeader();
    });

    let dispatch = createEventDispatcher();

    async function onSearch(event) {
        let value = event.detail.value;
        dispatch("search", value);
    }

    export let type = "main";

    let isLoginOpen = false;
    let isRegisterOpen = false;

    function LoginUpdate() {
        isLoginOpen = !isLoginOpen;
        updateHeader();
    }
    function RegisterUpdate() {
        isRegisterOpen = !isRegisterOpen;
        updateHeader();
    }
</script>

<RegisterWindow isModalOpen={isRegisterOpen} on:closeModal={RegisterUpdate}/>
<LoginWindow isModalOpen={isLoginOpen} on:closeModal={LoginUpdate}/>
<div class="header">
    {#if type === "main"}
    <div class="header__left">
        <Logo/>
        <div class="header__info">
            <div class="info__block">
                <LittleIcon source={icon1}/>
                <p class="header__text">Пн-Вс: c 10:00 до 23:45 ч.</p>
            </div>
            <div class="info__block">
                <LittleIcon source={icon2}/>
                <p class="header__text">8(982)190-81-58</p>
            </div>
        </div>
        <SocialLink img={logoVK} link="https://vk.com"/>
        <SocialLink img={logoTG} link="https://telegram.org"/>
    </div>
    {/if}
    {#if type === "catalogue"}
    <Logo/>
        <p class="header__text">Каталог</p>
        <Search on:search={onSearch}/>
    {/if}
    
    <div class="header__middle">
        <LittleIcon source={icon3} event={() => { window.location.href = "/busket"}}/>
        {#if displayName}
            <p class="header__money">{money} ₽</p>
        {:else}
            <p class="header__money">0 ₽</p>
        {/if}   
    </div>
    <div class="header__right">
        {#if displayName}
            <LittleIcon source={icon4}/>
            <p class="header__text">{name}</p>
        {:else}
            <PrimeBtn text="Войти" event={LoginUpdate}/>
            <PrimeBtn text="Зарегистрироваться" event={RegisterUpdate}/>
        {/if}
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap');
    .header {
        width: 100%;
        height: 137px;
        display: flex;
        flex-direction: row;
        gap: 25px;
        align-items: center;
        justify-content: space-between;
    }
    .header__text {
        font-family: Epilogue, sans-serif;
        margin: 0;
        font-size: 24px;
        font-weight: 750;
        line-height: 23px;
        letter-spacing: -0.27000001072883606px;
        text-align: left;
        color: #1C0F0D;
        margin-right: 20px;
    }
    .header__left {
        display: flex;
        gap: 25px;
        align-items: center;
        justify-content: start;
    }
    .header__middle {
        display: flex;
        gap: 25px;
        align-items: center;
        justify-content: end;
    }
    .header__right {
        display: flex;
        gap: 25px;
        align-items: center;
        justify-content: end;
    }
    .header__info {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .info__block {
        display: flex;
        gap: 5px;
        align-items: center;
    }
    .header__money {
        font-family: Epilogue, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
        width: fit-content;
        text-wrap: nowrap;
    }
    @media (min-width: 1700px) {
        .header__info {
            flex-direction: row;
            gap: 20px;
        }
    }
</style>