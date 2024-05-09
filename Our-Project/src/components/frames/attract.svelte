<script>
    import PrimeBtn from "$comp/ui_kit/prime_btn.svelte";

    function cataloguelink() {
        window.location.href = "/catalogue";
    }
</script>

<div class="attract">
    <div class="attract__content">
        <p class="attract__text">Ваш любимый вертолет,</p>
        <p class="attract__text">быстрая доставка</p>
        <PrimeBtn text="Посмотреть каталог" event={cataloguelink}/>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap');
    .attract {
        width: 100%;
        height: 500px;
        background-image: url("$lib/img/background.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
    }
    .attract__content {
        display: flex;
        flex-direction: column;
        width: 40%;
        gap: 10px;
        padding-left: 50px;
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