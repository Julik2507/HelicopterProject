<script>
    import LittleIcon from "$comp/ui_kit/little_icon.svelte";
    import PrimeBtn from "$comp/ui_kit/prime_btn.svelte";
    import SocialLink from "$comp/ui_kit/social_link.svelte";
</script>

<div class="header">
    <img src="src/img/Logo.png" alt="Logo"/>
    <p class="header__text">Доставка еды на вертолете</p>
    <LittleIcon source="src/img/Icon1.png"/>
    <p class="header__text">Пн-Вс: c 10:00 до 23:45 ч.</p>
    <LittleIcon source="src/img/Icon2.png"/>
    <p class="header__text">8(982)190-81-58</p>
    <PrimeBtn text="Позвоните мне"/>
    <SocialLink img="src/img/LinkVK.png"/>
    <SocialLink img="src/img/LinkTG.png"/>
    <span class="header__span"></span>
    <LittleIcon source="src/img/Icon3.png"/>
    <LittleIcon source="src/img/Icon4.png"/>
    <PrimeBtn text="Войти"/>
    <PrimeBtn text="Зарегистрироваться"/>
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
    }
    .header__text {
        font-family: Epilogue, sans-serif;
        font-size: 18px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: -0.27000001072883606px;
        text-align: left;
        color: #1C0F0D;
    }
</style>