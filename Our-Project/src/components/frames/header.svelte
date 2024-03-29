<script>
    import LittleIcon from "$comp/ui_kit/little_icon.svelte";
    import PrimeBtn from "$comp/ui_kit/prime_btn.svelte";
    import SocialLink from "$comp/ui_kit/social_link.svelte";
    import RegisterWindow from "$comp/auth_pop_ups/register_window.svelte";
    import LoginWindow from "$comp/auth_pop_ups/login_window.svelte";

    export let type = "main";

    let isLoginOpen = false;
    let isRegisterOpen = false;

    function LoginUpdate() {
        isLoginOpen = !isLoginOpen;
    }
    function RegisterUpdate() {
        isRegisterOpen = !isRegisterOpen;
    }
</script>

<RegisterWindow isModalOpen={isRegisterOpen} on:closeModal={RegisterUpdate}/>
<LoginWindow isModalOpen={isLoginOpen} on:closeModal={LoginUpdate}/>
<div class="header">
    <div class="header__left">
        <img src="src/img/Logo.png" alt="Logo"/>
        {#if type === "main"}
        <p class="header__text">Доставка еды на вертолете</p>
        <LittleIcon source="src/img/Icon1.png"/>
        <p class="header__text">Пн-Вс: c 10:00 до 23:45 ч.</p>
        <LittleIcon source="src/img/Icon2.png"/>
        <p class="header__text">8(982)190-81-58</p>
        <PrimeBtn text="Позвоните мне"/>
        <SocialLink img="src/img/LinkVK.png"/>
        <SocialLink img="src/img/LinkTG.png"/>
        {/if}
        {#if type === "catalogue"}
        <p class="header__text">Каталог</p>
        <input class="header__searchbar" type="text" name="email" placeholder="Искать в каталоге"/>
        {/if}
    </div>
    <div class="header__right">
        <LittleIcon source="src/img/Icon3.png"/>
        <LittleIcon source="src/img/Icon4.png"/>
        <PrimeBtn text="Войти" event={LoginUpdate}/>
        <PrimeBtn text="Зарегистрироваться" event={RegisterUpdate}/>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap');
    .header {
        width: 1920px;
        height: 137px;
        display: flex;
        flex-direction: row;
        gap: 25px;
        align-items: center;
        justify-content: space-between;
    }
    .header__text {
        font-family: Epilogue, sans-serif;
        font-size: 22px;
        font-weight: 750;
        line-height: 23px;
        letter-spacing: -0.27000001072883606px;
        text-align: left;
        color: #1C0F0D;
    }
    .header__right {
        display: flex;
        gap: 25px;
        align-items: center;
        justify-content: end;
    }
    .header__left {
        display: flex;
        gap: 25px;
        align-items: center;
        justify-content: start;
    }
    .header__searchbar {
        width: 1100px;
        height: 63px;
        top: 202px;
        left: 36px;
        border-radius: 21px;
        border: 0;
        padding-left: 20px;
        background-color: #F5E8E8;
        color: #967878;
        font-size: 20px;
        font-weight: bold;
    }
</style>