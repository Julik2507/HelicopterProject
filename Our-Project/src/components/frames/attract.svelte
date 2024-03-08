<script>
    import PrimeBtn from "$comp/ui_kit/prime_btn.svelte";
</script>

<div class="attract">
    <div class="attract__content">
        <p class="attract__text">Ваш любимый вертолет, быстрая доставка</p>
        <PrimeBtn text="Посмотреть каталог"/>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap');
    .attract {
        width: 1916px;
        height: 588px;
        background-image: url("src/img/background.png");
    }
    .attract__content {
        display: flex;
        flex-direction: column;
        width: 40%;
        padding-left: 100px;
        padding-top: 250px;
        gap: 30px;
    }
    .attract__text {
        font-family: Epilogue, sans-serif;
        font-size: 48px;
        font-weight: 700;
        line-height: 60px;
        letter-spacing: -1.5839999914169312px;
        text-align: left;
        color: #FFF;
        margin: 0;
    }
</style>